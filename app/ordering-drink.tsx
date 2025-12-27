import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

/* ---------------- TYPES ---------------- */
type Ingredient = {
  name: string;
  price: number;
  calories: number;
  sugar: number;
  fiber: number;
  color: string;
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
  { name: 'Orange', price: 4, calories: 62, sugar: 12, fiber: 3, color: '#F97316' },
  { name: 'Apple', price: 3, calories: 52, sugar: 10, fiber: 2, color: '#EF4444' },
  { name: 'Banana', price: 3, calories: 89, sugar: 12, fiber: 3, color: '#FDE047' },
  { name: 'Strawberry', price: 5, calories: 32, sugar: 4, fiber: 2, color: '#BE123C' },
  { name: 'Mango', price: 6, calories: 60, sugar: 14, fiber: 2, color: '#F59E0B' },
  { name: 'Pineapple', price: 5, calories: 50, sugar: 10, fiber: 1, color: '#EAB308' },
  { name: 'Watermelon', price: 4, calories: 30, sugar: 6, fiber: 1, color: '#EF4444' },
  { name: 'Blueberry', price: 6, calories: 57, sugar: 10, fiber: 2, color: '#1E3A8A' },
  { name: 'Carrot', price: 2, calories: 41, sugar: 5, fiber: 3, color: '#F97316' },
  { name: 'Spinach', price: 2, calories: 23, sugar: 0, fiber: 2, color: '#16A34A' },
  { name: 'Valencia Orange', price: 15, calories: 60, sugar: 12, fiber: 3, color: '#FB923C' },
  { name: 'Blood Orange', price: 18, calories: 65, sugar: 11, fiber: 3, color: '#BE123C' },
  { name: 'Mandarin', price: 12, calories: 50, sugar: 10, fiber: 2, color: '#FB923C' },
  { name: 'Organic Lemon', price: 10, calories: 29, sugar: 2, fiber: 2, color: '#FEF08A' },
  { name: 'Lime', price: 12, calories: 30, sugar: 1, fiber: 2, color: '#84CC16' },
  { name: 'Grapefruit', price: 14, calories: 52, sugar: 9, fiber: 2, color: '#F87171' },
  { name: 'Pomelo', price: 20, calories: 70, sugar: 0, fiber: 2, color: '#A3E635' },
];

const STORES: Store[] = [
  { id: '1', name: 'Bustani Fresh Bar', location: 'Main Farm Entrance', pickupTime: '5–10 min', rating: 4.9, priceMultiplier: 1 },
  { id: '2', name: 'Green Oasis Juice', location: 'Visitor Center', pickupTime: '10–15 min', rating: 4.7, priceMultiplier: 1.05 },
];

const ICE_LEVELS = ['No Ice', 'Normal Ice', 'Extra Ice'];

export default function OrderingDrink() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [store, setStore] = useState<Store | null>(STORES[0]);
  const [ice, setIce] = useState(ICE_LEVELS[1]);
  const [blending, setBlending] = useState(false);

  // Reanimated Values
  const shake = useSharedValue(0);
  const liquidHeight = useSharedValue(0);
  const liquidOpacity = useSharedValue(0);
  const bladeRotate = useSharedValue(0);

  // Check for pre-selected fruit from params
  useEffect(() => {
    const fruitParam = params.fruit;
    if (fruitParam && typeof fruitParam === 'string') {
      const found = INGREDIENTS.find(i => i.name.toLowerCase().includes(fruitParam.toLowerCase()));
      if (found) {
        setSelected([found]);
      }
    } else if (Array.isArray(fruitParam) && fruitParam.length > 0) {
      // Handle array case just in case
      const found = INGREDIENTS.find(i => i.name.toLowerCase().includes(fruitParam[0].toLowerCase()));
      if (found) {
        setSelected([found]);
      }
    }
  }, [params.fruit]);

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

    // Reset
    liquidHeight.value = 0;
    liquidOpacity.value = 1;

    // 1. Shake Blender
    shake.value = withRepeat(withSequence(
      withTiming(2, { duration: 50 }),
      withTiming(-2, { duration: 50 })
    ), 40, true); // Shake for ~2s

    // 2. Spin Blades
    bladeRotate.value = withRepeat(withTiming(360, { duration: 100, easing: Easing.linear }), 20);

    // 3. Fill Glass after blend
    setTimeout(() => {
      cancelAnimation(shake);
      cancelAnimation(bladeRotate);
      shake.value = 0;
      bladeRotate.value = 0;

      // Transfer liquid
      liquidHeight.value = withTiming(80, { duration: 1500, easing: Easing.out(Easing.exp) });

      setBlending(false);
    }, 2000);
  };

  // Derived Values
  const totals = selected.reduce(
    (acc, i) => {
      acc.price += i.price;
      acc.calories += i.calories;
      return acc;
    },
    { price: 0, calories: 0 }
  );

  const finalPrice = store ? Math.round(totals.price * store.priceMultiplier) : totals.price;

  // Animated Styles
  const blenderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }, { rotate: `${shake.value}deg` }]
  }));

  const bladeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bladeRotate.value}deg` }]
  }));

  const liquidStyle = useAnimatedStyle(() => ({
    height: `${liquidHeight.value}%`,
    opacity: liquidOpacity.value,
  }));

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#EAF6F3', '#FFFFFF']} style={styles.container}>
        {/* HEADER */}
        <BlurView intensity={80} style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1E7F5C" />
          </Pressable>
          <Text style={styles.headerTitle}>Juice Lab 🧪</Text>
          <View style={{ width: 24 }} />
        </BlurView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 80, paddingBottom: 120 }}>

          {/* BLENDER STAGE */}
          <View style={styles.stage}>
            <View style={styles.blenderContainer}>
              {/* Blender Jug */}
              <Animated.View style={[styles.blenderJug, blenderStyle]}>
                <View style={styles.blenderLid} />
                <View style={styles.blenderGlass}>
                  {/* Ingredients inside (simulated) */}
                  {blending && (
                    <View style={styles.swirlingLiquid} />
                  )}
                  {!blending && liquidHeight.value === 0 && selected.map((s, i) => (
                    <View key={i} style={[styles.floatingFruit, { backgroundColor: s.color, left: (i % 3) * 20, bottom: (Math.floor(i / 3)) * 20 }]} />
                  ))}
                </View>
                <View style={styles.blenderBase}>
                  <Animated.View style={[styles.blade, bladeStyle]} />
                </View>
              </Animated.View>
              <View style={styles.motorBase} />
            </View>

            {/* Serving Glass */}
            <View style={styles.glassContainer}>
              <View style={styles.glass}>
                <Animated.View style={[styles.finalLiquid, { backgroundColor: selected[0]?.color || '#FFA07A' }, liquidStyle]} />
                <View style={styles.shine} />
              </View>
            </View>
          </View>

          <Text style={styles.instruction}>
            {blending ? 'Blending in progress...' : 'Select ingredients to blend'}
          </Text>

          {/* INGREDIENTS GRID */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🍊 Fresh Ingredients</Text>
            <Text style={styles.sectionSub}>{selected.length} items</Text>
          </View>

          <View style={styles.grid}>
            {INGREDIENTS.map((item) => {
              const active = selected.find((i) => i.name === item.name);
              return (
                <Pressable
                  key={item.name}
                  onPress={() => toggleIngredient(item)}
                  style={[styles.card, active && styles.cardActive]}
                >
                  <View style={[styles.circle, { backgroundColor: active ? '#FFF' : item.color + '20' }]}>
                    <Text>{active ? '✅' : '🍎'}</Text>
                  </View>
                  <Text style={[styles.cardName, active && { color: 'white' }]}>{item.name}</Text>
                  <Text style={[styles.cardPrice, active && { color: '#E0F2FE' }]}>{item.price} SAR</Text>
                </Pressable>
              );
            })}
          </View>

        </ScrollView>
      </LinearGradient>

      {/* FLOAT BOTTOM */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total Calories</Text>
            <Text style={styles.totalValue}>{totals.calories} kcal</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalValue}>{finalPrice} SAR</Text>
          </View>
        </View>
        <Pressable
          style={[styles.blendBtn, (!selected.length || blending) && styles.disabled]}
          onPress={startBlend}
          disabled={!selected.length || blending}
        >
          <Text style={styles.blendText}>{blending ? 'Mixing...' : '🌪 Blend & Order'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },
  header: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
    height: 80, paddingTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E7F5C' },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#FFF' },

  stage: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', height: 260, gap: 20 },

  // BLENDER
  blenderContainer: { alignItems: 'center' },
  blenderJug: { width: 90, height: 140, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.8)', overflow: 'hidden' },
  blenderLid: { height: 10, backgroundColor: '#333', width: '100%' },
  blenderGlass: { flex: 1, justifyContent: 'flex-end', padding: 5 },
  blenderBase: { height: 15, backgroundColor: '#666', width: '100%', alignItems: 'center', justifyContent: 'center' },
  blade: { width: 60, height: 4, backgroundColor: '#CCC' },
  motorBase: { width: 80, height: 50, backgroundColor: '#1E7F5C', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -5 },

  swirlingLiquid: { width: '100%', height: '100%', backgroundColor: '#F97316', opacity: 0.8 },
  floatingFruit: { position: 'absolute', width: 20, height: 20, borderRadius: 10 },

  // GLASS
  glassContainer: { alignItems: 'center' },
  glass: { width: 70, height: 110, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.2)', overflow: 'hidden', justifyContent: 'flex-end' },
  finalLiquid: { width: '100%' },
  shine: { position: 'absolute', top: 10, left: 5, width: 4, height: 40, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 2 },

  instruction: { textAlign: 'center', marginTop: 20, color: '#4B7F73', fontWeight: '600' },

  // GRID
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E7F5C' },
  sectionSub: { color: '#666' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15 },
  card: {
    width: (width - 50) / 3, backgroundColor: '#FFF', borderRadius: 16, padding: 10, margin: 5, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4
  },
  cardActive: { backgroundColor: '#1E7F5C' },
  circle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  cardName: { fontSize: 12, fontWeight: '700', textAlign: 'center', color: '#333', marginBottom: 4 },
  cardPrice: { fontSize: 10, color: '#888' },

  footer: {
    position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#FFF', padding: 20, paddingBottom: 30, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { color: '#888', fontSize: 12 },
  totalValue: { color: '#1E7F5C', fontSize: 18, fontWeight: '800' },
  blendBtn: { backgroundColor: '#1E7F5C', padding: 18, borderRadius: 20, alignItems: 'center' },
  blendText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  disabled: { opacity: 0.5 }
});
