import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Svg, Circle, Path, Rect } from 'react-native-svg';

const { height } = Dimensions.get('window');

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedPath = Animated.createAnimatedComponent(Path);

type Role = 'visitor' | 'producer' | 'farmer';

/* ---------------------------------------------------
   🎨 GRADIENT TOKENS (TYPE SAFE)
--------------------------------------------------- */

const VISITOR_BG: [string, string] = ['#EAF6F3', '#D1FAE5'];
const PRODUCER_BG: [string, string] = ['#FFF4E6', '#FFE0B2'];
const FARMER_BG: [string, string] = ['#E8F5E9', '#C8E6C9'];
const DARK_BG: [string, string] = ['#0F2A1D', '#0F2A1D'];

/* ---------------------------------------------------
   🎭 HUMAN SVG MICRO-STORIES
--------------------------------------------------- */

const VisitorSVG = ({ active }: { active: boolean }) => {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: -6, duration: 1200, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [active]);

  return (
    <Animated.View style={{ transform: [{ translateY: y }] }}>
      <Svg width={120} height={120} viewBox="0 0 120 120">
        <Circle cx="60" cy="32" r="14" fill="#FFD166" />
        <Path d="M40 90 Q60 60 80 90" stroke="#0F2A1D" strokeWidth={6} fill="none" />
        <Rect x="42" y="48" width="36" height="32" rx="10" fill="#4CAF8E" />
      </Svg>
    </Animated.View>
  );
};

const ProducerSVG = ({ active }: { active: boolean }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 900, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [active]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Svg width={110} height={110} viewBox="0 0 120 120">
        <Circle cx="60" cy="30" r="13" fill="#FFB703" />
        <Rect x="38" y="48" width="44" height="30" rx="8" fill="#E29C5C" />
        <Rect x="30" y="82" width="60" height="14" rx="6" fill="#6B3E26" />
      </Svg>
    </Animated.View>
  );
};

const FarmerSVG = ({ active }: { active: boolean }) => {
  const grow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;

    Animated.loop(
      Animated.timing(grow, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      })
    ).start();
  }, [active]);

  return (
    <Svg width={110} height={110} viewBox="0 0 120 120">
      {/* Head */}
      <Circle cx="60" cy="30" r="13" fill="#90BE6D" />

      {/* Body */}
      <Rect x="48" y="48" width="24" height="32" rx="6" fill="#2E7D32" />

      {/* 🌱 Animated plant (wrapped) */}
      <Animated.View
        style={{
          transform: [
            {
              scaleY: grow.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 1],
              }),
            },
          ],
        }}
      >
        <Svg width={110} height={110} viewBox="0 0 120 120">
          <Path
            d="M60 90 C60 80 45 70 45 58"
            stroke="#1E7F5C"
            strokeWidth={4}
            fill="none"
          />
        </Svg>
      </Animated.View>
    </Svg>
  );
};


/* ---------------------------------------------------
   🌬 AMBIENT BACKGROUND PARTICLES
--------------------------------------------------- */

const AmbientDots = () =>
  Array.from({ length: 14 }).map((_, i) => {
    const y = useRef(new Animated.Value(Math.random() * height)).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(y, {
          toValue: -40,
          duration: 9000 + Math.random() * 4000,
          useNativeDriver: true,
        })
      ).start();
    }, []);

    return (
      <Animated.View
        key={i}
        style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.08)',
          left: Math.random() * 360,
          transform: [{ translateY: y }],
        }}
      />
    );
  });

/* ---------------------------------------------------
   🌟 MAIN SCREEN
--------------------------------------------------- */

export default function ChooseRoleScreen() {
  const [active, setActive] = useState<Role | null>(null);

  const focus = (role: Role) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActive(role);
  };

  const bgColors: [string, string] =
    active === 'visitor'
      ? VISITOR_BG
      : active === 'producer'
      ? PRODUCER_BG
      : active === 'farmer'
      ? FARMER_BG
      : DARK_BG;

  return (
    <AnimatedGradient colors={bgColors} style={styles.container}>
      <AmbientDots />

      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Personalize your Bustani+ experience</Text>

      {/* VISITOR */}
      <Pressable
        style={[styles.cardLarge, active && active !== 'visitor' && styles.dim]}
        onPress={() => focus('visitor')}
      >
        <VisitorSVG active={active === 'visitor'} />
        <Text style={styles.cardTitle}>Visitor</Text>
        <Text style={styles.cardText}>Explore farms & agritourism</Text>
      </Pressable>

      {/* BOTTOM */}
      <View style={styles.row}>
        <Pressable
          style={[styles.cardSmall, active && active !== 'producer' && styles.dim]}
          onPress={() => focus('producer')}
        >
          <ProducerSVG active={active === 'producer'} />
          <Text style={styles.cardTitle}>Producer</Text>
          <Text style={styles.cardText}>Sell & manage products</Text>
        </Pressable>

        <Pressable
          style={[styles.cardSmall, active && active !== 'farmer' && styles.dim]}
          onPress={() => focus('farmer')}
        >
          <FarmerSVG active={active === 'farmer'} />
          <Text style={styles.cardTitle}>Farmer</Text>
          <Text style={styles.cardText}>Smart farming insights</Text>
        </Pressable>
      </View>
    </AnimatedGradient>
  );
}

/* ---------------------------------------------------
   🎨 STYLES — MATERIAL 3 / 2026
--------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#CDE7DF',
    marginBottom: 28,
  },

  cardLarge: {
    height: height * 0.32,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 8,
  },

  row: {
    flexDirection: 'row',
    gap: 14,
  },

  cardSmall: {
    flex: 1,
    height: height * 0.28,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  dim: {
    opacity: 0.5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    color: '#1B120E',
  },

  cardText: {
    fontSize: 13,
    color: '#3A3A3A',
    marginTop: 4,
    textAlign: 'center',
  },
});
