import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Svg, Rect, Circle, Path, Line } from 'react-native-svg';

/* ---------------------------------------------------
   Animated SVG wrappers
--------------------------------------------------- */

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

/* ---------------------------------------------------
   Shared grow-in animation
--------------------------------------------------- */

const useGrowIn = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    opacity,
    transform: [{ translateY }],
  };
};

/* ---------------------------------------------------
   ONBOARDING SLIDES
--------------------------------------------------- */

export const onboardingSlides = [
  /* ===================================================
     🌱 SLIDE 1 — SMART FARMING
  =================================================== */
  {
    key: 'smart-farming',
    title: 'Smart & Sustainable Farming',
    subtitle: 'AI-powered insights • Data-driven irrigation • Water efficiency',
    Illustration: () => {
      const anim = useGrowIn();

      return (
        <AnimatedSvg width="100%" height={240} viewBox="0 0 360 240" style={anim}>
          {/* Sky */}
          <Rect x="0" y="0" width="360" height="90" fill="#1E7F5C" />

          {/* Soil */}
          <Rect x="0" y="90" width="360" height="150" fill="#4A2F1B" />

          {/* Soil grains */}
          {[...Array(45)].map((_, i) => (
            <Circle
              key={i}
              cx={Math.random() * 360}
              cy={110 + Math.random() * 120}
              r={Math.random() * 2 + 1}
              fill="#6B3E26"
              opacity={0.6}
            />
          ))}

          {/* Roots */}
          {[...Array(6)].map((_, i) => (
            <Path
              key={i}
              d={`M${60 + i * 40} 90 C${60 + i * 40} 140, ${80 + i * 40} 190, ${70 + i * 40} 240`}
              stroke="#2B1A10"
              strokeWidth="1"
              fill="none"
              opacity={0.45}
            />
          ))}
        </AnimatedSvg>
      );
    },
  },

  /* ===================================================
     🏭 SLIDE 2 — LOCAL PRODUCTS
  =================================================== */
  {
    key: 'local-products',
    title: 'Empowering Local Products',
    subtitle: 'From the farm to the market',
    Illustration: () => {
      const anim = useGrowIn();

      return (
        <AnimatedSvg width="100%" height={240} viewBox="0 0 360 240" style={anim}>
          {/* Ground */}
          <Rect x="0" y="140" width="360" height="100" fill="#4A2F1B" />

          {/* Products */}
          {[0, 1, 2].map((i) => (
            <Rect
              key={i}
              x={70 + i * 80}
              y={100 - i * 10}
              width="60"
              height="40"
              rx="6"
              fill="#E29C5C"
            />
          ))}

          {/* Growth lines */}
          {[0, 1, 2].map((i) => (
            <Line
              key={i}
              x1={100 + i * 80}
              y1="140"
              x2={100 + i * 80}
              y2={100 - i * 10}
              stroke="#1E7F5C"
              strokeWidth="2"
            />
          ))}
        </AnimatedSvg>
      );
    },
  },

  /* ===================================================
     🌍 SLIDE 3 — AGRITOURISM (SKY + CLOUDS + SOIL)
  =================================================== */
  {
    key: 'agritourism',
    title: 'Agritourism Experience',
    subtitle: 'Education • Engagement • Sustainability',
    Illustration: () => {
      const anim = useGrowIn();
      const cloudOpacity = useRef(new Animated.Value(0.7)).current;

      useEffect(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(cloudOpacity, {
              toValue: 1,
              duration: 5000,
              useNativeDriver: true,
            }),
            Animated.timing(cloudOpacity, {
              toValue: 0.7,
              duration: 5000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, []);

      return (
        <AnimatedSvg width="100%" height={300} viewBox="0 0 360 300" style={anim}>
          {/* 🌤 SKY */}
          <Rect x="0" y="0" width="360" height="120" fill="#BFE7F2" />

          {/* ☀️ SUN */}
          <Circle cx="310" cy="30" r="18" fill="#FFD166" />

          {/* ☁️ CLOUDS */}
          <AnimatedCircle cx="70" cy="45" r="14" fill="#FFFFFF" opacity={cloudOpacity} />
          <AnimatedCircle cx="92" cy="45" r="10" fill="#FFFFFF" opacity={cloudOpacity} />
          <AnimatedCircle cx="220" cy="60" r="12" fill="#FFFFFF" opacity={cloudOpacity} />
          <AnimatedCircle cx="242" cy="60" r="9" fill="#FFFFFF" opacity={cloudOpacity} />

          {/* 🌾 GREEN FIELDS */}
          <Path
            d="M0 170 Q90 140 180 170 T360 170 V300 H0 Z"
            fill="#4CAF8E"
          />
          <Path
            d="M0 195 Q90 165 180 195 T360 195 V300 H0 Z"
            fill="#2E8B6E"
          />

          {/* 🌱 SOIL */}
          <Path
            d="M0 225 Q90 210 180 225 T360 225 V300 H0 Z"
            fill="#4A2F1B"
          />

          {/* 🚶 TOUR PATH */}
          <AnimatedPath
            d="M180 300 C200 250, 160 210, 180 150"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="5 5"
            fill="none"
            opacity={0.9}
          />
        </AnimatedSvg>
      );
    },
  },
];
