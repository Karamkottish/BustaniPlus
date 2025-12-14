import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import styles from '@/styles/home.styles';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

/* ---------------------------------------------------
   🌍 REALISTIC SOIL LAYER
--------------------------------------------------- */

const SOIL_COLORS = [
  '#2B1A10', // deep soil
  '#3B2314',
  '#4A2F1B',
  '#6B3E26',
  '#7A4A2E', // sand
];

const RealSoilLayer = ({ count = 260 }) => {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 9000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const dots = useRef(
    Array.from({ length: count }).map(() => {
      const size = Math.random() * 4 + 1;
      return {
        size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.3,
        color: SOIL_COLORS[Math.floor(Math.random() * SOIL_COLORS.length)],
      };
    })
  ).current;

  const driftStyle = {
    transform: [
      {
        translateX: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [-1, 1],
        }),
      },
    ],
  };

  return (
    <>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={[
            soilStyles.dot,
            {
              width: dot.size,
              height: dot.size,
              borderRadius: dot.size / 2,
              backgroundColor: dot.color,
              opacity: dot.opacity,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            },
            driftStyle,
          ]}
        />
      ))}
    </>
  );
};

/* ---------------------------------------------------
   🌱 ROOT LINES
--------------------------------------------------- */

const RootLines = ({ count = 14 }) => {
  const roots = useRef(
    Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      height: Math.random() * 120 + 80,
      opacity: Math.random() * 0.2 + 0.08,
    }))
  ).current;

  return (
    <>
      {roots.map((root, i) => (
        <View
          key={i}
          style={[
            soilStyles.root,
            {
              left: `${root.left}%`,
              height: root.height,
              opacity: root.opacity,
            },
          ]}
        />
      ))}
    </>
  );
};

/* ---------------------------------------------------
   🌱 MAIN SCREEN
--------------------------------------------------- */

export default function TabOneScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.75)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;

  const skyY = useRef(new Animated.Value(0)).current;
  const soilY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        damping: 12,
        stiffness: 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
const timeout = setTimeout(() => {
    router.replace('/onboarding');
  }, 3000);
    Animated.loop(
      Animated.sequence([
        Animated.timing(sway, {
          toValue: 1,
          duration: 3200,
          useNativeDriver: true,
        }),
        Animated.timing(sway, {
          toValue: -1,
          duration: 3200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(skyY, {
          toValue: -10,
          duration: 7000,
          useNativeDriver: true,
        }),
        Animated.timing(skyY, {
          toValue: 0,
          duration: 7000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(soilY, {
          toValue: 6,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(soilY, {
          toValue: 0,
          duration: 9000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = sway.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-2deg', '2deg'],
  });

  return (
    <View style={styles.container}>
      {/* SKY */}
      <Animated.View
        style={[
          styles.sky,
          { transform: [{ translateY: skyY }] },
        ]}
      />

      {/* SOIL */}
      <Animated.View
        style={[
          styles.soil,
          { transform: [{ translateY: soilY }] },
        ]}
      >
        <RootLines />
        <RealSoilLayer />
      </Animated.View>

      {/* LOGO */}
      <Animated.Image
        source={require('@/assets/images/bustani.png')}
        resizeMode="contain"
        style={[
          styles.logo,
          {
            opacity,
            transform: [{ scale }, { rotate }],
          },
        ]}
      />
    </View>
  );
}

/* ---------------------------------------------------
   🎨 SOIL STYLES
--------------------------------------------------- */

const soilStyles = StyleSheet.create({
  dot: {
    position: 'absolute',
  },
  root: {
    position: 'absolute',
    bottom: 0,
    width: 1,
    backgroundColor: '#2B1A10',
  },
});
