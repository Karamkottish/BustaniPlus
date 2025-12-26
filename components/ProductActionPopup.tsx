import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type ProductAction = 'manage' | 'sell' | 'process' | null;

interface Props {
  visible: boolean;
  productName: string;
  action: ProductAction;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function ProductActionPopup({
  visible,
  productName,
  action,
  onClose,
}: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  /* ------------------- PAN GESTURE ------------------- */

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 140) {
        translateY.value = withTiming(height, { duration: 220 });
        onClose();
      } else {
        translateY.value = withTiming(0, { duration: 220 });
      }
    });

  if (!visible || !action) return null;

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={styles.overlay}
    >
      {/* TAP ANYWHERE TO CLOSE */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.sheet,
            sheetStyle,
            {
              paddingBottom: insets.bottom + 24, // ⬅️ ABOVE NAV BAR
            },
          ]}
        >
          {/* HANDLE */}
          <View style={styles.handle} />

          {/* HEADER */}
          <Text style={styles.title}>
            {action === 'process'
              ? 'Processing Journey'
              : action === 'manage'
              ? 'Manage Product'
              : 'Sell Product'}
          </Text>

          <Text style={styles.subtitle}>{productName}</Text>

          <View style={styles.divider} />

          {/* PROCESS STORY */}
          {action === 'process' && (
            <View style={styles.storyContainer}>
              <StoryStep icon="leaf-outline" text="Harvested from the farm" />
              <StoryStep icon="flask-outline" text="Processed into juice or oil" />
              <StoryStep icon="cube-outline" text="Packaged & branded" />
              <StoryStep
                icon="trending-up-outline"
                text="Sold with higher market value"
                highlight
              />
            </View>
          )}

          {/* MANAGE */}
          {action === 'manage' && (
            <>
              <Option icon="cube-outline" label="Update Stock" />
              <Option icon="settings-outline" label="Usage Allocation" />
              <Option icon="analytics-outline" label="Performance Insights" />
            </>
          )}

          {/* SELL */}
          {action === 'sell' && (
            <>
              <Option icon="cart-outline" label="Local Market" />
              <Option icon="globe-outline" label="Export" />
              <Option icon="pricetag-outline" label="Wholesale" />
            </>
          )}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SUB COMPONENTS                               */
/* -------------------------------------------------------------------------- */

function Option({ icon, label }: { icon: any; label: string }) {
  return (
    <Pressable style={styles.option}>
      <Ionicons name={icon} size={20} color="#1E7F5C" />
      <Text style={styles.optionText}>{label}</Text>
    </Pressable>
  );
}

function StoryStep({
  icon,
  text,
  highlight,
}: {
  icon: any;
  text: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.story}>
      <View
        style={[
          styles.storyIcon,
          highlight && styles.storyIconHighlight,
        ]}
      >
        <Ionicons
          name={icon}
          size={18}
          color={highlight ? '#FFFFFF' : '#065F46'}
        />
      </View>
      <Text
        style={[
          styles.storyText,
          highlight && styles.storyTextHighlight,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // softer glass
    justifyContent: 'flex-end',
    zIndex: 999,
  },

  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 16,
    maxHeight: '85%', // responsive
  },

  handle: {
    width: 48,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F2A1D',
    letterSpacing: -0.3,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 18,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
  },

  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F2A1D',
  },

  storyContainer: {
    gap: 10,
  },

  story: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },

  storyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storyIconHighlight: {
    backgroundColor: '#1E7F5C',
  },

  storyText: {
    fontSize: 14,
    color: '#065F46',
    fontWeight: '600',
  },

  storyTextHighlight: {
    color: '#1E7F5C',
    fontWeight: '800',
  },
});
