import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import { Svg, Rect, Circle, Path } from 'react-native-svg';
import { onboardingSlides } from './slides';
import { useRouter } from 'expo-router';


const { width } = Dimensions.get('window');

/* ---------------------------------------------------
   🌿 SMALL FARMING SVG ICON (ABOVE TEXT)
--------------------------------------------------- */

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type SlideType = 'farm' | 'product' | 'tourism';

const SlideIcon = ({ type }: { type: SlideType }) => {
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <AnimatedSvg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      style={{ transform: [{ scale }], marginBottom: 16 }}
    >
      {type === 'farm' && (
        <>
          <Rect x="0" y="36" width="64" height="28" fill="#4A2F1B" />
          <Path
            d="M32 36 C30 28, 26 22, 32 12 C38 22, 34 28, 32 36"
            fill="#1E7F5C"
          />
        </>
      )}

      {type === 'product' && (
        <>
          <Rect x="14" y="22" width="36" height="26" rx="4" fill="#E29C5C" />
          <Rect x="14" y="14" width="36" height="10" fill="#C9823B" />
        </>
      )}

      {type === 'tourism' && (
        <>
          <Circle cx="48" cy="16" r="6" fill="#FFD166" />
          <Path
            d="M0 44 Q16 36 32 44 T64 44 V64 H0 Z"
            fill="#1E7F5C"
          />
        </>
      )}
    </AnimatedSvg>
  );
};

/* ---------------------------------------------------
   🌍 ONBOARDING SCREEN (SWIPEABLE)
--------------------------------------------------- */

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const slide = onboardingSlides[index];
  const isLast = index === onboardingSlides.length - 1;

  const iconType: SlideType =
    slide.key === 'smart-farming'
      ? 'farm'
      : slide.key === 'local-products'
      ? 'product'
      : 'tourism';

  const isAgritourism = slide.key === 'agritourism';

const onNext = () => {
  if (isLast) {
router.replace('/choose-role');
    return;
  }

  flatListRef.current?.scrollToIndex({
    index: index + 1,
    animated: true,
  });
};

  return (
    <View
      style={[
        styles.container,
        isAgritourism && styles.lightBackground,
      ]}
    >
      {/* SWIPEABLE SLIDES */}
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <View style={styles.illustration}>
              <item.Illustration />
            </View>
          </View>
        )}
      />

      {/* ICON */}
      <SlideIcon type={iconType} />

      {/* TEXT */}
      <Text
        style={[
          styles.title,
          isAgritourism && styles.darkText,
        ]}
      >
        {slide.title}
      </Text>

      <Text
        style={[
          styles.subtitle,
          isAgritourism && styles.darkSubtext,
        ]}
      >
        {slide.subtitle}
      </Text>

      {/* DOTS */}
      <View style={styles.dots}>
        {onboardingSlides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* BUTTON */}
      <Pressable style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>
          {isLast ? 'Get Started' : 'Next'}
        </Text>
      </Pressable>
    </View>
  );
}

/* ---------------------------------------------------
   🎨 STYLES
--------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2A1D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightBackground: {
    backgroundColor: '#EAF6F3',
  },

  illustration: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },

  darkText: {
    color: '#0F2A1D',
  },

  subtitle: {
    fontSize: 14,
    color: '#D1FAE5',
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 22,
    paddingHorizontal: 24,
  },

  darkSubtext: {
    color: '#3A5F55',
  },

  dots: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#E29C5C',
    width: 20,
  },

  button: {
    backgroundColor: '#E29C5C',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 28,
    marginBottom: 40,
  },

  buttonText: {
    color: '#1B120E',
    fontWeight: '700',
    fontSize: 16,
  },
});
