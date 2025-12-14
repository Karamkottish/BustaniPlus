import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

export default function ARTour() {
  const tabBarHeight = useBottomTabBarHeight();

  const grow1 = useRef(new Animated.Value(0)).current;
  const grow2 = useRef(new Animated.Value(0)).current;
  const grow3 = useRef(new Animated.Value(0)).current;

  const glow = useRef(new Animated.Value(0)).current;
  const sunFloat = useRef(new Animated.Value(0)).current;
  const cloudMove = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const growAnim = (anim: Animated.Value, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 4500,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 4500,
            useNativeDriver: true,
          }),
        ])
      ).start();

    growAnim(grow1, 0);
    growAnim(grow2, 600);
    growAnim(grow3, 1200);

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sunFloat, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(sunFloat, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(cloudMove, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const plantStyle = (anim: Animated.Value) => ({
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [26, 0], // grows UP from soil
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.4, 1],
        }),
      },
    ],
  });

  return (
    <LinearGradient
      colors={['#87CEEB', '#EAF6F3']}
      style={styles.container}
    >
      {/* ☀️ SUN */}
      <Animated.View
        style={[
          styles.sun,
          {
            transform: [
              {
                translateY: sunFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -12],
                }),
              },
            ],
          },
        ]}
      />

      {/* ☁️ CLOUDS */}
      <Animated.Text
        style={[
          styles.cloud,
          {
            transform: [
              {
                translateX: cloudMove.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-120, width + 120],
                }),
              },
            ],
          },
        ]}
      >
        ☁️ ☁️
      </Animated.Text>

      {/* 🌿 CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>👓 AR Farm Tour</Text>
        <Text style={styles.subtitle}>
          We’re growing something special for you
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>🚧 Feature Coming Soon</Text>
        </View>
      </View>

      {/* 🌱 SOIL + PLANTS */}
      <View
        style={[
          styles.soilContainer,
          { bottom: tabBarHeight },
        ]}
      >
        {/* 🌱 PLANTS (touching soil) */}
        <View style={styles.plantsRow}>
          <Animated.View style={[styles.plant, plantStyle(grow1)]}>
            <Text style={styles.plantEmoji}>🌱</Text>
          </Animated.View>

          <Animated.View style={[styles.plant, plantStyle(grow2)]}>
            <Text style={styles.plantEmoji}>🌿</Text>
          </Animated.View>

          <Animated.View style={[styles.plant, plantStyle(grow3)]}>
            <Text style={styles.plantEmoji}>🌾</Text>
          </Animated.View>
        </View>

        {/* ✨ ORBS (just above soil) */}
        <View style={styles.orbs}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.orb,
                {
                  opacity: glow.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]}
            />
          ))}
        </View>

        {/* 🌍 SOIL */}
        <View style={styles.soil} />
      </View>
    </LinearGradient>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sun: {
    position: 'absolute',
    top: 60,
    right: 40,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFD166',
  },

  cloud: {
    position: 'absolute',
    top: 120,
    fontSize: 42,
    opacity: 0.5,
  },

  content: {
    marginTop: 140,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E7F5C',
  },
  subtitle: {
    marginTop: 8,
    color: '#4B7F73',
    textAlign: 'center',
  },
  badge: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
  badgeText: {
    fontWeight: '700',
    color: '#1E7F5C',
  },

  soilContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  plantsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end', // 👈 critical: plants sit on soil
    gap: 32,
  },

  plant: {
    justifyContent: 'flex-end',
  },
  plantEmoji: {
    fontSize: 44,
  },

  orbs: {
    flexDirection: 'row',
    gap: 14,
    marginVertical: 4,
  },
  orb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD166',
  },

  soil: {
    width: '100%',
    height: 32,
    backgroundColor: '#6B3E26',
  },
});
