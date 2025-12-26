import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const tabs = [
  { name: 'home', label: 'Home', icon: 'home-outline' },
  { name: 'products', label: 'Products', icon: 'leaf-outline' },
  { name: 'orders', label: 'Orders', icon: 'receipt-outline' },
  { name: 'insights', label: 'Insights', icon: 'analytics-outline' },
];

export default function ProducerTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <Animated.View style={styles.wrapper}>
      <View style={styles.bar}>
        {tabs.map((tab, index) => {
          const active = state.index === index;

          return (
            <Pressable
              key={tab.name}
              style={styles.item}
              onPress={() => navigation.navigate(tab.name)}
            >
              <Ionicons
                name={tab.icon as any}
                size={22}
                color={active ? '#1E7F5C' : '#9CA3AF'}
              />
              <Text style={[styles.label, active && styles.active]}>
                {tab.label}
              </Text>
              {active && <Animated.View style={styles.dot} />}
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 18,
    left: 16,
    right: 16,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    elevation: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  active: {
    color: '#1E7F5C',
    fontWeight: '800',
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#1E7F5C',
    borderRadius: 3,
    marginTop: 4,
  },
});
