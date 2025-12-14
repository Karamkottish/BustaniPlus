import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Passport() {
  const [stamps, setStamps] = useState(3);
    const stampScale = useState(() => new Animated.Value(0.6))[0];
const stampGlow = useState(() => new Animated.Value(0))[0];
const animateStamp = () => {
  stampScale.setValue(0.6);
  stampGlow.setValue(0);

  Animated.parallel([
    Animated.spring(stampScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }),
    Animated.sequence([
      Animated.timing(stampGlow, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(stampGlow, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]),
  ]).start();
};

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.book}
    >
      {/* =======================
          📘 PAGE 1 – COVER
      ======================== */}
      <LinearGradient colors={['#0B6E4F', '#145A32']} style={styles.page}>
        <View style={styles.pattern} />

        <Image
          source={require('../../assets/images/bustani.png')}
          style={styles.bustaniLogo}
          resizeMode="contain"
        />

        <Text style={styles.arabicTitle}>الجواز الزراعي</Text>
        <Text style={styles.title}>CITRUS PASSPORT</Text>
        <Text style={styles.brand}>Bustani+</Text>

        <Image
          source={require('../../assets/images/vision2030.png')}
          style={styles.visionLogo}
          resizeMode="contain"
        />

        <Text style={styles.swipeHint}>Swipe →</Text>
      </LinearGradient>

      {/* =======================
          👤 PAGE 2 – PROFILE
      ======================== */}
      <LinearGradient colors={['#145A32', '#0B6E4F']} style={styles.page}>
        <View style={styles.pattern} />

        {/* 🧒 Virtual Avatar */}
        <View style={styles.avatarWrapper}>
          <LinearGradient
            colors={['#34D399', '#1E7F5C']}
            style={styles.virtualAvatar}
          >
            <Text style={styles.avatarEmoji}>🙂</Text>
            <Text style={styles.avatarInitials}>SK</Text>
          </LinearGradient>
        </View>

        <Text style={styles.profileName}>Sham Kottish</Text>
        <Text style={styles.profileSub}>🇸🇦 Saudi Arabia</Text>

        <View style={styles.profileCard}>
          <Text style={styles.profileRow}>📘 Passport ID: BP-2030-001</Text>
          <Text style={styles.profileRow}>🍊 Stamps: {stamps}/10</Text>
          <Text style={styles.profileRow}>🌿 Program: Bustani+</Text>
        </View>

        <Text style={styles.swipeHint}>Swipe →</Text>
      </LinearGradient>

      {/* =======================
          📄 PAGE 3 – STAMPS
      ======================== */}
      <View style={[styles.page, styles.innerPage]}>
        <Text style={styles.pageTitle}>🍊 Stamp Progress</Text>
        <Text style={styles.progress}>{stamps} / 10 Stamps Collected</Text>

        <View style={styles.stampsRow}>
  {Array.from({ length: 10 }).map((_, i) => {
    const isActive = i < stamps;
    const isLast = i === stamps - 1;

    return (
      <Animated.View
        key={i}
        style={[
          styles.stamp,
          isActive && styles.stampActive,
          isLast && {
            transform: [{ scale: stampScale }],
            shadowColor: '#FFD166',
            shadowOpacity: stampGlow,
            shadowRadius: 10,
          },
        ]}
      >
        <Text style={{ fontSize: 20 }}>
          {isActive ? '🍊' : '⬜'}
        </Text>
      </Animated.View>
    );
  })}
</View>


        <Pressable
  style={styles.button}
  onPress={() => {
    if (stamps < 10) {
      setStamps((s) => s + 1);
      animateStamp();
    }
  }}
>
  <Text style={styles.buttonText}>
    📸 Scan QR → Add Stamp
  </Text>
</Pressable>

      </View>

      {/* =======================
          🏆 PAGE 4 – REWARDS
      ======================== */}
      <View style={[styles.page, styles.innerPage]}>
        <Text style={styles.pageTitle}>🏆 Rewards</Text>

        {stamps >= 3 && <Text style={styles.reward}>🎟 Free Workshop</Text>}
        {stamps >= 5 && <Text style={styles.reward}>🍊 Free Citrus Pack</Text>}
        {stamps >= 10 && (
          <Text style={styles.rewardBig}>👑 Citrus Explorer Unlocked!</Text>
        )}

        <Text style={styles.note}>
          Visit farms & scan QR codes to unlock rewards
        </Text>
      </View>
    </ScrollView>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  book: { flex: 1, backgroundColor: '#F4F9F6' },

  page: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  pattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.06,
    backgroundColor: '#FFFFFF',
  },

  bustaniLogo: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },

  arabicTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FDE68A',
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  brand: {
    marginTop: 8,
    fontSize: 14,
    color: '#D1FAE5',
  },

  visionLogo: {
    position: 'absolute',
    bottom: 90,
    width: 190,
    height: 120,
  },

  swipeHint: {
    position: 'absolute',
    bottom: 40,
    color: '#D1FAE5',
    fontWeight: '600',
  },

  /* 👤 PROFILE */
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: '#FDE68A',
  },

  virtualAvatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarEmoji: {
    fontSize: 42,
    marginBottom: -4,
  },

  avatarInitials: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ECFDF5',
    opacity: 0.9,
  },

  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  profileSub: {
    color: '#D1FAE5',
    marginBottom: 16,
  },

  profileCard: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
  },

  profileRow: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 6,
  },

  /* 📄 INNER */
  innerPage: { backgroundColor: '#FFFFFF' },

  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E7F5C',
    marginBottom: 16,
  },

  progress: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },

  stampsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 24,
  },

  stamp: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#EAF6F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stampActive: {
    backgroundColor: '#1E7F5C',
  },

  button: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  reward: {
    fontSize: 18,
    marginBottom: 10,
  },

  rewardBig: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E7F5C',
  },

  note: {
    marginTop: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
