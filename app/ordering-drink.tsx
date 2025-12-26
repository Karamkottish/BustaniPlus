import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';

/* ---------------- TYPES ---------------- */

type Ingredient = {
  name: string;
  price: number;
  calories: number;
  sugar: number;
  fiber: number;
};

type Store = {
  id: string;
  name: string;
  location: string;
  pickupTime: string;
  rating: number;
  priceMultiplier: number;
};

/* ---------------- DATA ---------------- */

const INGREDIENTS: Ingredient[] = [
  { name: 'Orange', price: 4, calories: 62, sugar: 12, fiber: 3 },
  { name: 'Apple', price: 3, calories: 52, sugar: 10, fiber: 2 },
  { name: 'Banana', price: 3, calories: 89, sugar: 12, fiber: 3 },
  { name: 'Strawberry', price: 5, calories: 32, sugar: 4, fiber: 2 },
  { name: 'Mango', price: 6, calories: 60, sugar: 14, fiber: 2 },
  { name: 'Pineapple', price: 5, calories: 50, sugar: 10, fiber: 1 },
  { name: 'Watermelon', price: 4, calories: 30, sugar: 6, fiber: 1 },
  { name: 'Blueberry', price: 6, calories: 57, sugar: 10, fiber: 2 },
  { name: 'Carrot', price: 2, calories: 41, sugar: 5, fiber: 3 },
  { name: 'Spinach', price: 2, calories: 23, sugar: 0, fiber: 2 },
  { name: 'Cucumber', price: 2, calories: 16, sugar: 2, fiber: 1 },
  { name: 'Beetroot', price: 3, calories: 43, sugar: 7, fiber: 2 },
  { name: 'Mint', price: 1, calories: 5, sugar: 0, fiber: 1 },
];

const STORES: Store[] = [
  {
    id: '1',
    name: 'Bustani Fresh Bar',
    location: 'Main Farm Entrance',
    pickupTime: '5–10 min',
    rating: 4.9,
    priceMultiplier: 1,
  },
  {
    id: '2',
    name: 'Green Oasis Juice',
    location: 'Visitor Center',
    pickupTime: '10–15 min',
    rating: 4.7,
    priceMultiplier: 1.05,
  },
  {
    id: '3',
    name: 'Organic Blend Station',
    location: 'Kids Zone',
    pickupTime: '7–12 min',
    rating: 4.8,
    priceMultiplier: 1.1,
  },
];

const ICE_LEVELS = ['No Ice', 'Normal Ice', 'Extra Ice'];
const SWEETNESS_LEVELS = ['No Sugar', 'Medium', 'Sweet'];

export default function OrderingDrink() {
  const router = useRouter();

  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [ice, setIce] = useState(ICE_LEVELS[1]);
  const [sweetness, setSweetness] = useState(SWEETNESS_LEVELS[1]);
  const [blending, setBlending] = useState(false);

  const spin = useRef(new Animated.Value(0)).current;
  const fill = useRef(new Animated.Value(0)).current;

  const toggleIngredient = (item: Ingredient) => {
    setSelected((prev) =>
      prev.find((i) => i.name === item.name)
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item]
    );
  };

  const startBlend = () => {
    if (!selected.length || !store) return;

    setBlending(true);
    spin.setValue(0);
    fill.setValue(0);

    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(fill, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start(() => {
      spin.stopAnimation();
      setBlending(false);
    });
  };

  const totals = selected.reduce(
    (acc, i) => {
      acc.price += i.price;
      acc.calories += i.calories;
      acc.sugar += i.sugar;
      acc.fiber += i.fiber;
      return acc;
    },
    { price: 0, calories: 0, sugar: 0, fiber: 0 }
  );

  const finalPrice = store
    ? Math.round(totals.price * store.priceMultiplier)
    : totals.price;

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const fillHeight = fill.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '85%'],
  });

  return (
    <LinearGradient colors={['#EAF6F3', '#FFFFFF']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Build Your Juice</Text>
        <Text style={styles.subtitle}>
          Choose ingredients • Select store • Pickup fresh
        </Text>

        {/* INGREDIENTS */}
        <Text style={styles.section}>Ingredients</Text>
        <View style={styles.grid}>
          {INGREDIENTS.map((item) => {
            const active = selected.find((i) => i.name === item.name);
            return (
              <Pressable
                key={item.name}
                onPress={() => toggleIngredient(item)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item.name} · {item.price} SAR
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* 🏪 PICKUP STORES – 2026 UI */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏪 Pickup Store</Text>

          {STORES.map((s) => {
            const active = store?.id === s.id;

            return (
              <Pressable
                key={s.id}
                onPress={() => setStore(s)}
                style={[
                  styles.storeCard,
                  active && styles.storeActive,
                ]}
              >
                <View style={styles.storeHeader}>
                  <View style={styles.storeAvatar}>
                    <Text style={styles.storeAvatarText}>🥤</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.storeName,
                        active && styles.storeNameActive,
                      ]}
                    >
                      {s.name}
                    </Text>
                    <Text
                      style={[
                        styles.storeLocation,
                        active && styles.storeMetaActive,
                      ]}
                    >
                      📍 {s.location}
                    </Text>
                  </View>

                  <View style={styles.ratingPill}>
                    <Text style={styles.ratingText}>⭐ {s.rating}</Text>
                  </View>
                </View>

                <View style={styles.storeFooter}>
                  <View style={styles.timeChip}>
                    <Text style={styles.timeText}>⏱ {s.pickupTime}</Text>
                  </View>

                  {active && (
                    <Text style={styles.selectedText}>Selected</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* ICE + SWEETNESS */}
        <Selector title="🧊 Ice Level" options={ICE_LEVELS} value={ice} onSelect={setIce} />
        <Selector title="🍯 Sweetness" options={SWEETNESS_LEVELS} value={sweetness} onSelect={setSweetness} />

        {/* BLENDER */}
        <View style={styles.blenderArea}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <View style={styles.blenderCup} />
            <View style={styles.blenderBase} />
          </Animated.View>

          <View style={styles.glass}>
            <Animated.View style={[styles.juice, { height: fillHeight }]} />
          </View>

          <Text style={styles.blenderText}>
            {blending ? 'Blending…' : 'Ready to blend'}
          </Text>
        </View>

        {!!selected.length && store && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Summary</Text>
            <Text>Store: {store.name}</Text>
            <Text>Ice: {ice}</Text>
            <Text>Sweetness: {sweetness}</Text>
            <Text>Calories: {totals.calories} kcal</Text>
            <Text style={styles.price}>Total: {finalPrice} SAR</Text>
          </View>
        )}

        <Pressable
          style={[
            styles.primary,
            (!selected.length || !store || blending) && styles.disabled,
          ]}
          disabled={!selected.length || !store || blending}
          onPress={startBlend}
        >
          <Text style={styles.primaryText}>
            {blending ? 'Blending…' : 'Blend & Order'}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------------- SELECTOR ---------------- */

function Selector({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.selectorRow}>
        {options.map((o) => (
          <Pressable
            key={o}
            onPress={() => onSelect(o)}
            style={[
              styles.selector,
              value === o && styles.selectorActive,
            ]}
          >
            <Text
              style={[
                styles.selectorText,
                value === o && styles.selectorTextActive,
              ]}
            >
              {o}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 30, fontWeight: '900', color: '#1E7F5C' },
  subtitle: { color: '#4B7F73', marginBottom: 20 },

  section: { fontWeight: '800', marginBottom: 10, marginTop: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#EAF6F3',
    borderRadius: 999,
  },
  chipActive: { backgroundColor: '#1E7F5C' },
  chipText: { color: '#1E7F5C', fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    marginTop: 20,
  },
  cardTitle: { fontWeight: '800', marginBottom: 12 },

  /* 🏪 STORE CARD */
  storeCard: {
    backgroundColor: '#F0FDF9',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5F4EF',
  },
  storeActive: {
    backgroundColor: '#1E7F5C',
    borderColor: '#1E7F5C',
  },

  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storeAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EAF6F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeAvatarText: { fontSize: 22 },

  storeName: {
    fontWeight: '800',
    color: '#1E7F5C',
  },
  storeNameActive: { color: '#FFFFFF' },

  storeLocation: {
    fontSize: 12,
    color: '#4B7F73',
    marginTop: 2,
  },
  storeMetaActive: { color: '#D1FAE5' },

  ratingPill: {
    backgroundColor: '#EAF6F3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E7F5C',
  },

  storeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },
  timeChip: {
    backgroundColor: '#EAF6F3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E7F5C',
  },
  selectedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D1FAE5',
  },

  selectorRow: { flexDirection: 'row', gap: 10 },
  selector: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#EAF6F3',
  },
  selectorActive: { backgroundColor: '#1E7F5C' },
  selectorText: { color: '#1E7F5C', fontWeight: '600' },
  selectorTextActive: { color: '#FFFFFF' },

  blenderArea: { marginTop: 40, alignItems: 'center' },
  blenderCup: {
    width: 90,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#BEE7E8',
  },
  blenderBase: {
    width: 70,
    height: 20,
    backgroundColor: '#1E7F5C',
    marginTop: 6,
    borderRadius: 10,
    alignSelf: 'center',
  },
  glass: {
    width: 70,
    height: 120,
    borderWidth: 2,
    borderColor: '#BEE7E8',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  juice: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F97316',
  },
  blenderText: { marginTop: 10, color: '#4B7F5C' },

  primary: {
    backgroundColor: '#1E7F5C',
    padding: 18,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 30,
  },
  disabled: { opacity: 0.4 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },

  price: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E7F5C',
    marginTop: 10,
  },

  backBtn: { marginTop: 20, alignItems: 'center' },
  backText: { color: '#1E7F5C', fontWeight: '600' },
});
