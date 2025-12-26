import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function RevenueChart() {
  const h1 = useSharedValue(30);
  const h2 = useSharedValue(60);
  const h3 = useSharedValue(100);

  useEffect(() => {
    h1.value = withTiming(80);
    h2.value = withTiming(120);
    h3.value = withTiming(60);
  }, []);

  return (
    <View style={styles.chart}>
      <Bar height={h1} />
      <Bar height={h2} />
      <Bar height={h3} />
    </View>
  );
}

function Bar({ height }: { height: any }) {
  const style = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return <Animated.View style={[styles.bar, style]} />;
}

const styles = StyleSheet.create({
  chart: {
    height: 140,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-end',
    marginTop: 20,
  },
  bar: {
    width: 26,
    backgroundColor: '#1E7F5C',
    borderRadius: 10,
  },
});
