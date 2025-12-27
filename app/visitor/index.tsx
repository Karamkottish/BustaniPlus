import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import LogoutModal from '@/components/LogoutModal';

const { width } = Dimensions.get('window');

export default function VisitorHome() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const [showLogout, setShowLogout] = useState(false);

  // 🌱 Plant
  const plantGrow = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;

  // ☁️ Clouds
  const cloud1 = useRef(new Animated.Value(-100)).current;
  const cloud2 = useRef(new Animated.Value(width)).current;

  // ☀️ Sun
  const sunPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Plant animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(plantGrow, { toValue: 1, duration: 6000, useNativeDriver: true }),
        Animated.timing(plantGrow, { toValue: 0, duration: 6000, useNativeDriver: true }),
      ])
    ).start();

    // Glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // ☁️ Cloud 1 (slow)
    Animated.loop(
      Animated.sequence([
        Animated.timing(cloud1, {
          toValue: width,
          duration: 45000,
          useNativeDriver: true,
        }),
        Animated.timing(cloud1, {
          toValue: -150,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // ☁️ Cloud 2 (faster, opposite)
    Animated.loop(
      Animated.sequence([
        Animated.timing(cloud2, {
          toValue: -150,
          duration: 35000,
          useNativeDriver: true,
        }),
        Animated.timing(cloud2, {
          toValue: width,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // ☀️ Sun pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(sunPulse, {
          toValue: 1.08,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(sunPulse, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const plantTranslateY = plantGrow.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const plantScale = plantGrow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  const orbOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <View style={styles.container}>
      {/* 🌤️ SKY HERO */}
      <View style={styles.skyWrapper}>
        <LinearGradient
          colors={['#87CEEB', '#BEE7E8', '#EAF6F3']}
          style={styles.sky}
        />

        {/* Logout Button */}
        <Pressable
          style={styles.logoutBtnWrapper}
          onPress={() => setShowLogout(true)}
        >
          <BlurView intensity={30} tint="light" style={styles.logoutBtnBlur}>
            <Ionicons name="log-out-outline" size={24} color="#1E7F5C" />
          </BlurView>
        </Pressable>

        {/* ☀️ SUN */}
        <Animated.View
          style={[
            styles.sun,
            { transform: [{ scale: sunPulse }] },
          ]}
        />

        {/* ☁️ CLOUDS */}
        <Animated.View style={[styles.cloud, { transform: [{ translateX: cloud1 }] }]}>
          <Text style={styles.cloudText}>☁️</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.cloud,
            styles.cloudSmall,
            { transform: [{ translateX: cloud2 }] },
          ]}
        >
          <Text style={styles.cloudText}>☁️</Text>
        </Animated.View>

        {/* HERO CONTENT */}
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>🌿 Bustani+</Text>
          <Text style={styles.heroSubtitle}>
            Agritourism • Farms • Festival Experience
          </Text>
        </View>
      </View>

      {/* FESTIVAL CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎉 Today at the Festival</Text>
        <Text>🍊 Citrus picking</Text>
        <Text>🧺 Handmade workshops</Text>
        <Text>🎮 Kids learning games</Text>
      </View>

      <Pressable
        style={styles.primary}
        onPress={() => router.push('/schedule')}
      >
        <Text style={styles.primaryText}>📅 Festival Schedule</Text>
      </Pressable>

      {/* 🌱 SOIL + PLANT */}
      <View style={[styles.soilContainer, { bottom: tabBarHeight - 10 }]}>
        <Animated.View
          style={[
            styles.plant,
            {
              transform: [
                { translateY: plantTranslateY },
                { scale: plantScale },
              ],
            },
          ]}
        >
          <Text style={styles.plantEmoji}>🌱</Text>
        </Animated.View>

        <View style={styles.orbsRow}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[styles.orb, { opacity: orbOpacity }]}
            />
          ))}
        </View>

        <View style={styles.soil} />
      </View>

      <LogoutModal
        visible={showLogout}
        onClose={() => setShowLogout(false)}
        onLogout={() => {
          setShowLogout(false);
          router.replace('/choose-role');
        }}
      />
    </View>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6F3',
  },

  /* 🌤️ SKY */
  skyWrapper: {
    height: 260,
    overflow: 'hidden',
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
  },

  logoutBtnWrapper: {
    position: 'absolute',
    top: 54,
    right: 24,
    borderRadius: 22,
    overflow: 'hidden',
    zIndex: 100,
    shadowColor: '#1E7F5C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  logoutBtnBlur: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.45)', // Glassy
  },

  heroContent: {
    marginTop: 90,
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1E7F5C',
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#2F6F6A',
  },

  /* ☀️ SUN */
  sun: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD166',
    opacity: 0.9,
  },

  /* ☁️ CLOUDS */
  cloud: {
    position: 'absolute',
    top: 40,
  },
  cloudSmall: {
    top: 90,
    opacity: 0.8,
  },
  cloudText: {
    fontSize: 48,
  },

  /* CARD */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    margin: 20,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 16,
  },

  primary: {
    height: 54,
    borderRadius: 18,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  /* 🌱 SOIL */
  soilContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  plant: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantEmoji: {
    fontSize: 40,
  },
  orbsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 6,
  },
  orb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD166',
  },
  soil: {
    width: '100%',
    height: 26,
    backgroundColor: '#6B3E26',
  },
});
