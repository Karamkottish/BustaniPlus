import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Animated, StyleSheet } from 'react-native';
import { useRef } from 'react';

function AnimatedTabIcon({ name, color, size, focused }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  Animated.spring(scale, {
    toValue: focused ? 1.25 : 1,
    friction: 4,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}

export default function VisitorLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFD166',
        tabBarInactiveTintColor: '#E6C3A1',
        tabBarStyle: {
          height: 82,
          paddingBottom: 10,
          backgroundColor: '#6B3E26',
          position: 'absolute',
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      {/* 🏠 HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <>
              {focused && <View style={styles.glow} />}
              <AnimatedTabIcon
                name="leaf"
                size={size}
                color={color}
                focused={focused}
              />
            </>
          ),
        }}
      />

      {/* 🗺 FARMS */}
      <Tabs.Screen
        name="map"
        options={{
          title: 'Farms',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="map"
              size={size}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* 📅 BOOK */}
      <Tabs.Screen
        name="book"
        options={{
          title: 'Book',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="calendar"
              size={size}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* 👓 AR TOUR */}
      <Tabs.Screen
        name="ar-tour"
        options={{
          title: 'AR Tour',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="augmented-reality"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 🎮 KIDS */}
      <Tabs.Screen
        name="kids"
        options={{
          title: 'Kids',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="game-controller"
              size={size}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* 📘 PASSPORT */}
      <Tabs.Screen
        name="passport"
        options={{
          title: 'Passport',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="book"
              size={size}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFD166',
    opacity: 0.35,
    top: -6,
  },
});
