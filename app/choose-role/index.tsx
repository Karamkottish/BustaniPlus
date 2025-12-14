import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Svg, Circle, Path, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { PanGestureHandler } from 'react-native-gesture-handler';
import VisitorConfirmPopup from '../components/VisitorConfirmPopup';


const { height, width } = Dimensions.get('window');

type Role = 'visitor' | 'producer' | 'farmer';

const VISITOR_BG: [string, string] = ['#EAF6F3', '#D1FAE5'];
const PRODUCER_BG: [string, string] = ['#FFF4E6', '#FFE0B2'];
const FARMER_BG: [string, string] = ['#E8F5E9', '#C8E6C9'];
const DARK_BG: [string, string] = ['#0F2A1D', '#0F2A1D'];

/* ---------------- SVGs ---------------- */

const VisitorSVG = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120">
    <Circle cx="60" cy="32" r="14" fill="#FFD166" />
    <Path d="M40 90 Q60 60 80 90" stroke="#0F2A1D" strokeWidth={6} fill="none" />
    <Rect x="42" y="48" width="36" height="32" rx="10" fill="#4CAF8E" />
  </Svg>
);

const ProducerSVG = () => (
  <Svg width={110} height={110} viewBox="0 0 120 120">
    <Circle cx="60" cy="30" r="13" fill="#FFB703" />
    <Rect x="38" y="48" width="44" height="30" rx="8" fill="#E29C5C" />
    <Rect x="30" y="82" width="60" height="14" rx="6" fill="#6B3E26" />
  </Svg>
);

const FarmerSVG = () => (
  <Svg width={110} height={110} viewBox="0 0 120 120">
    <Circle cx="60" cy="30" r="13" fill="#90BE6D" />
    <Rect x="48" y="48" width="24" height="32" rx="6" fill="#2E7D32" />
    <Path d="M60 90 C60 80 45 70 45 58" stroke="#1E7F5C" strokeWidth={4} fill="none" />
  </Svg>
);

/* ---------------- Login Preview ---------------- */

function LoginPreview({ role }: { role: Role }) {
  const router = useRouter();

  return (
    <View style={styles.loginContent}>
      <Text style={styles.loginTitle}>
        {role === 'producer' ? 'Producer Login' : 'Farmer Login'}
      </Text>

      <TextInput
        placeholder="Email address"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        style={styles.input}
      />

      <Pressable
        style={styles.loginButton}
        onPress={() =>
          router.push({
            pathname: '/login',
            params: { role },
          })
        }
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

/* ---------------- Screen ---------------- */

export default function ChooseRoleScreen() {
  const [active, setActive] = useState<Role | null>(null);
  const [overlayRole, setOverlayRole] = useState<Role | null>(null);
const [visitorPopup, setVisitorPopup] = useState(false);
  const flip = useRef(new Animated.Value(0)).current;
  const open = useRef(new Animated.Value(0)).current;
  const keyboardY = useRef(new Animated.Value(0)).current;
  const swipeX = useRef(new Animated.Value(0)).current;

  /* ---------- Keyboard lift ---------- */
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const show = Keyboard.addListener(showEvent as any, (e: any) => {
      const kh = e?.endCoordinates?.height ?? 0;
      Animated.timing(keyboardY, {
        toValue: -Math.min(180, kh / 2.2),
        duration: 220,
        useNativeDriver: true,
      }).start();
    });

    const hide = Keyboard.addListener(hideEvent as any, () => {
      Animated.timing(keyboardY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  /* ---------- Open overlay ---------- */
  const openOverlay = (role: Role) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActive(role);
    setOverlayRole(role);

    flip.setValue(0);
    open.setValue(0);
    swipeX.setValue(0);

    Animated.sequence([
      Animated.timing(flip, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(open, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /* ---------- Close overlay ---------- */
  const closeOverlay = () => {
    Animated.parallel([
      Animated.timing(open, { toValue: 0, duration: 220, useNativeDriver: true }),
      Animated.timing(flip, { toValue: 0, duration: 220, useNativeDriver: true }),
      Animated.timing(swipeX, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      setOverlayRole(null);
      setActive(null);
    });
  };

  /* ---------- Swipe gesture ---------- */
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: swipeX } }],
    { useNativeDriver: true }
  );

  const onGestureEnd = ({ nativeEvent }: any) => {
    const { translationX, velocityX } = nativeEvent;

    if (Math.abs(translationX) > 120 || Math.abs(velocityX) > 800) {
      Animated.timing(swipeX, {
        toValue: translationX > 0 ? width : -width,
        duration: 180,
        useNativeDriver: true,
      }).start(closeOverlay);
    } else {
      Animated.spring(swipeX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const overlayRotate = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const overlayScaleY = open.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 1],
  });

  const overlayOpacity = open.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const bgColors =
    active === 'visitor'
      ? VISITOR_BG
      : active === 'producer'
      ? PRODUCER_BG
      : active === 'farmer'
      ? FARMER_BG
      : DARK_BG;

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Personalize your Bustani+ experience</Text>

<Pressable
  style={[styles.cardLarge, overlayRole && styles.dim]}
  onPress={() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setVisitorPopup(true);
  }}
>
        <VisitorSVG />
        <Text style={styles.cardTitle}>Visitor</Text>
        <Text style={styles.cardText}>Explore farms & agritourism</Text>
      </Pressable>

      <View style={styles.row}>
        <Pressable style={[styles.cardSmall, overlayRole && styles.dim]} onPress={() => openOverlay('producer')}>
          <ProducerSVG />
          <Text style={styles.cardTitle}>Producer</Text>
          <Text style={styles.cardText}>Sell & manage products</Text>
        </Pressable>

        <Pressable style={[styles.cardSmall, overlayRole && styles.dim]} onPress={() => openOverlay('farmer')}>
          <FarmerSVG />
          <Text style={styles.cardTitle}>Farmer</Text>
          <Text style={styles.cardText}>Smart farming insights</Text>
        </Pressable>
      </View>

      {overlayRole && (
        <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
          <Animated.View
            style={[
              styles.overlayCard,
              {
                opacity: overlayOpacity,
                transform: [
                  { perspective: 1200 },
                  { translateX: swipeX },
                  { rotateY: overlayRotate },
                  { translateY: keyboardY },
                  { scaleY: overlayScaleY },
                ],
              },
            ]}
          >
            <Animated.View style={{ flex: 1, transform: [{ rotateY: overlayRotate }] }}>
              <LoginPreview role={overlayRole} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      )}
      <VisitorConfirmPopup
  visible={visitorPopup}
  onClose={() => setVisitorPopup(false)}
/>

    </LinearGradient>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56, paddingHorizontal: 20 },
  title: { fontSize: 30, fontWeight: '800', color: '#FFFFFF' },
  subtitle: { color: '#CDE7DF', marginBottom: 28 },
  cardLarge: {
    height: height * 0.32,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  row: { flexDirection: 'row', gap: 14 },
  cardSmall: {
    flex: 1,
    height: height * 0.28,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dim: { opacity: 0.25 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginTop: 10 },
  cardText: { fontSize: 13, color: '#3A3A3A', marginTop: 4, textAlign: 'center' },
  overlayCard: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: height * 0.35,
    height: height * 0.85,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    elevation: 14,
    overflow: 'hidden',
  },
  loginContent: { flex: 1, justifyContent: 'center', padding: 24 },
  loginTitle: { fontSize: 22, fontWeight: '800', marginBottom: 20 },
  input: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  loginButton: {
    height: 50,
    borderRadius: 16,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
