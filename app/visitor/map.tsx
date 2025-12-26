import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const { height } = Dimensions.get('window');

/* 📍 Riyadh – default center */
const RIYADH = {
  latitude: 24.7136,
  longitude: 46.6753,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

/* 🌱 Farms */
const FARMS = [
  {
    id: '1',
    name: '🍊 Orange Farm',
    category: 'Citrus',
    weatherTag: '☀️ Best Today',
    latitude: 24.719,
    longitude: 46.68,
  },
  {
    id: '2',
    name: '🌿 Organic Garden',
    category: 'Organic',
    weatherTag: '🌿 Good for Heat',
    latitude: 24.705,
    longitude: 46.665,
  },
  {
    id: '3',
    name: '🏡 Heritage Farm',
    category: 'Heritage',
    weatherTag: '🧺 Indoor Friendly',
    latitude: 24.73,
    longitude: 46.69,
  },
];

export default function FarmMap() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight(); // ✅ IMPORTANT
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const goToFarm = (id: string) => {
    router.push(`/farm/${id}`);
  };

  return (
    <LinearGradient colors={['#EAF6F3', '#F6FBF9']} style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 260 }} // ✅ space for button
      >
        {/* 🗺 MAP */}
        <View style={styles.mapBox} pointerEvents="box-none">
          <MapView style={StyleSheet.absoluteFill} initialRegion={RIYADH}>
            {FARMS.map((farm) => (
              <Marker
                key={farm.id}
                coordinate={{
                  latitude: farm.latitude,
                  longitude: farm.longitude,
                }}
                onPress={() => goToFarm(farm.id)}
              >
                <Animated.Text
                  style={[
                    styles.marker,
                    { transform: [{ scale: pulse }] },
                  ]}
                >
                  📍
                </Animated.Text>
              </Marker>
            ))}
          </MapView>
        </View>

        {/* 🌤 WEATHER */}
        <View style={styles.weatherBox}>
          <Text style={styles.sectionTitle}>🌤 Recommended Today</Text>
          {FARMS.map((f) => (
            <Text key={f.id} style={styles.weatherItem}>
              {f.weatherTag} — {f.name}
            </Text>
          ))}
        </View>

        {/* 🌱 FARM LIST */}
        <View style={styles.list}>
          {FARMS.map((farm) => (
            <Pressable
              key={farm.id}
              style={styles.card}
              onPress={() => goToFarm(farm.id)}
            >
              <Text style={styles.cardTitle}>{farm.name}</Text>
              <Text style={styles.meta}>
                {farm.category} • {farm.weatherTag}
              </Text>

              <View style={styles.actions}>
                <Text>🧭 Navigate</Text>
                <Text>📅 Book</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* 🥤 ORDER DRINK BUTTON — FLOATING ABOVE TAB BAR */}
      <View
        style={[
          styles.orderDrinkWrapper,
          { bottom: tabBarHeight + 16 }, // ✅ THIS FIXES IT
        ]}
      >
        <Pressable
          style={styles.orderDrinkBtn}
          onPress={() => router.push('/ordering-drink')}
        >
          <Text style={styles.orderDrinkText}>🥤 Order a Drink</Text>
        </Pressable>
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

  mapBox: {
    height: 260,
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },

  marker: {
    fontSize: 28,
  },

  weatherBox: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
  weatherItem: {
    color: '#4B7F73',
    marginBottom: 4,
  },

  list: {
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  meta: {
    color: '#6B7280',
    marginVertical: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /* 🥤 ORDER DRINK */
  orderDrinkWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  orderDrinkBtn: {
    backgroundColor: '#1E7F5C',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  orderDrinkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
