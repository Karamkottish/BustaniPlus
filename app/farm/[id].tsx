import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { FARMS, Citrus } from '../../constants/data';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FarmDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const farm = FARMS.find((f) => f.id === id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!farm) {
    return (
      <View style={styles.center}>
        <Text>Farm not found 😔</Text>
      </View>
    );
  }

  // 💰 Pricing
  const PRICE_ADULT = 50;
  const PRICE_CHILD = 25;
  const CURRENCY = 'SAR';

  const dates = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'];

  const goToBlender = (fruit: Citrus) => {
    // In a real app, we'd pass the fruit ID/Name to the blender
    // For now, let's simulate this intent
    router.push({ pathname: '/ordering-drink', params: { fruit: fruit.name } });
  };

  return (
    <View style={styles.root}>
      {/* 🔙 Custom Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BlurView intensity={80} style={styles.blurBtn}>
            <Ionicons name="arrow-back" size={24} color="#1E7F5C" />
          </BlurView>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* 🌾 HERO BACKGROUND */}
        <View style={styles.hero}>
          <LinearGradient
            colors={['#A7F3D0', '#EAF6F3']}
            style={styles.heroBg}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>🌾</Text>
            <Text style={styles.title}>{farm.name}</Text>
            <Text style={styles.subtitle}>{farm.category} • {farm.weatherTag}</Text>
          </View>
        </View>

        {/* 🍊 FRESH CITRUS MARKET (New Section) */}
        <View style={styles.marketContainer}>
          <Text style={styles.sectionTitle}>🍊 Fresh Harvest Market</Text>
          <Text style={styles.sectionSubtitle}>Pick fresh fruits or blend them instantly!</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.marketList}>
            {farm.citruses.map((fruit) => (
              <Pressable
                key={fruit.id}
                style={styles.productCard}
                onPress={() => goToBlender(fruit)}
              >
                <View style={styles.productBadge}>
                  <Text style={styles.productBadgeText}>Fresh</Text>
                </View>
                <View style={styles.productIconCircle}>
                  <Text style={styles.productIcon}>{fruit.image}</Text>
                </View>
                <Text style={styles.productName}>{fruit.name}</Text>
                <Text style={styles.productPrice}>{fruit.price} SAR / kg</Text>

                <View style={styles.addToBlenderBtn}>
                  <Ionicons name="nutrition" size={16} color="white" />
                  <Text style={styles.addToBlenderText}>Juice it!</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 📖 ABOUT - Using Farm Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🌱 About this Farm</Text>
          <Text style={styles.text}>
            {farm.description || 'Enjoy authentic farming with guided tours, hands-on workshops, seasonal harvests, and kid-friendly learning experiences.'}
          </Text>
        </View>

        {/* 🧺 ACTIVITIES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧺 Activities</Text>
          <View style={styles.activityGrid}>
            {['🍊 Fruit picking', '👩‍🌾 Guided tour', '🧒 Kids zone', '🧑‍🍳 Workshops'].map((act, i) => (
              <View key={i} style={styles.activityChip}>
                <Text style={styles.activityText}>{act}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 📅 DATE PICKER */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📅 Select Visit Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
            {dates.map((d) => (
              <Pressable
                key={d}
                onPress={() => setSelectedDate(d)}
                style={[
                  styles.dateChip,
                  selectedDate === d && styles.dateSelected,
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === d && styles.dateTextSelected,
                  ]}
                >
                  {d}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 💳 PRICING INFO */}
        <View style={styles.card}>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Admit One</Text>
              <Text style={styles.priceValue}>{PRICE_ADULT} {CURRENCY} <Text style={styles.priceSub}>/ adult</Text></Text>
            </View>
            <View>
              <Text style={styles.priceLabel}>Child</Text>
              <Text style={styles.priceValue}>{PRICE_CHILD} {CURRENCY}</Text>
            </View>
          </View>
        </View>

        {/* 👓 AR PREVIEW */}
        <View style={[styles.card, { backgroundColor: '#F0FDF4' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.sectionTitle}>👓 See it in AR</Text>
              <Text style={[styles.text, { fontSize: 12 }]}>Walk through the farm virtually.</Text>
            </View>
            <Pressable
              style={styles.arButton}
              onPress={() => router.push('/visitor/map')} // Placeholder
            >
              <Text style={styles.arText}>View 3D</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>

      {/* 💳 STICKY PAYMENT CTA */}
      <BlurView intensity={90} tint="light" style={styles.sticky}>
        <Pressable style={styles.primary}>
          <Text style={styles.primaryText}>
            💳 Book Ticket • {PRICE_ADULT} {CURRENCY}
          </Text>
          <Text style={styles.paymentHint}>
            {selectedDate ? `Selected: ${selectedDate}` : 'Select a date'}
          </Text>
        </Pressable>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backBtn: { borderRadius: 20, overflow: 'hidden' },
  blurBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  hero: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  heroBg: { ...StyleSheet.absoluteFillObject },
  heroContent: { alignItems: 'center' },
  heroEmoji: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '900', color: '#1E7F5C', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#4B7F73', marginTop: 4, fontWeight: '600' },

  // MARKET
  marketContainer: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#166534', marginBottom: 4, paddingHorizontal: 20 },
  sectionSubtitle: { fontSize: 13, color: '#6B7280', marginBottom: 16, paddingHorizontal: 20 },
  marketList: { paddingHorizontal: 20, paddingBottom: 20 },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: width * 0.4,
    padding: 16,
    marginRight: 14,
    alignItems: 'center',
    shadowColor: '#1E7F5C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  productBadge: {
    position: 'absolute', top: 10, left: 10,
    backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8
  },
  productBadgeText: { fontSize: 10, fontWeight: '700', color: '#166534' },
  productIconCircle: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#F0FDF4',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12, marginTop: 10
  },
  productIcon: { fontSize: 36 },
  productName: { fontSize: 16, fontWeight: '800', color: '#1E7F5C', textAlign: 'center' },
  productPrice: { fontSize: 12, color: '#4B7F73', marginBottom: 12, fontWeight: '600' },
  addToBlenderBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F97316',
    paddingVertical: 8, paddingHorizontal: 16, borderRadius: 14, gap: 6
  },
  addToBlenderText: { color: '#FFF', fontSize: 12, fontWeight: '700' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  text: { color: '#4B7F73', lineHeight: 22 },

  // ACTIVITIES GRID
  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  activityChip: {
    backgroundColor: '#F0FDF9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  activityText: { color: '#115E59', fontWeight: '600', fontSize: 13 },

  dateRow: { paddingRight: 20 },
  dateChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
  },
  dateSelected: { backgroundColor: '#1E7F5C' },
  dateText: { color: '#4B5563', fontWeight: '600' },
  dateTextSelected: { color: '#FFFFFF' },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { color: '#6B7280', fontSize: 13, marginBottom: 4 },
  priceValue: { fontSize: 20, fontWeight: '800', color: '#1E7F5C' },
  priceSub: { fontSize: 14, color: '#9CA3AF', fontWeight: '400' },

  arButton: { backgroundColor: '#1E7F5C', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  arText: { color: '#FFF', fontWeight: '700', fontSize: 13 },

  sticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 34,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  primary: {
    backgroundColor: '#1E7F5C',
    padding: 18,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#1E7F5C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  paymentHint: { marginTop: 4, color: '#A7F3D0', fontSize: 12, fontWeight: '500' },
});
