import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

const TABS = [
  { name: 'home', label: 'Home', icon: 'home-analytics', type: 'mci' }, // analytics focused
  { name: 'products', label: 'Products', icon: 'cube-outline', type: 'ion' },
  { name: 'orders', label: 'Orders', icon: 'clipboard-list-outline', type: 'mci' }, // Central hub for producer? Maybe insights is better.
  { name: 'insights', label: 'Insights', icon: 'chart-line', type: 'mci' },
];

export default function ProducerTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Active tab detection
  const activeTab = TABS.find(tab => pathname.includes(tab.name))?.name || 'home';

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="light" style={styles.blurContainer}>
        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TabItem
              key={tab.name}
              tab={tab}
              isActive={activeTab === tab.name}
              onPress={() => router.push(`/producer/${tab.name === 'home' ? 'home' : tab.name}` as any)}
            />
          ))}
        </View>
      </BlurView>
    </View>
  );
}

function TabItem({ tab, isActive, onPress }: any) {
  const scale = useSharedValue(1);
  const activeY = useSharedValue(0);

  useEffect(() => {
    activeY.value = withSpring(isActive ? -4 : 0, { damping: 12 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: activeY.value }]
  }));

  const handlePress = () => {
    scale.value = withSpring(0.8, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.tabBtn}>
      <Animated.View style={[styles.iconWrapper, animatedStyle]}>
        {tab.type === 'ion' ? (
          <Ionicons name={isActive ? tab.icon : tab.icon as any} size={24} color={isActive ? '#10B981' : '#9CA3AF'} />
        ) : (
          <MaterialCommunityIcons name={tab.icon} size={24} color={isActive ? '#10B981' : '#9CA3AF'} />
        )}
        {isActive && <View style={styles.activeDot} />}
      </Animated.View>
      {isActive && <Text style={styles.label}>{tab.label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  blurContainer: {
    width: '100%',
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 70,
    paddingHorizontal: 8,
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    marginTop: 2,
  },
  activeDot: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10B981',
  },
});
