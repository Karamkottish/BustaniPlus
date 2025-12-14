import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function FarmDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 💰 Pricing (API-ready)
  const PRICE_ADULT = 50;
  const PRICE_CHILD = 25;
  const CURRENCY = 'SAR';

  const dates = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'];

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#EAF6F3', '#FFFFFF']} style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {/* 🌾 HERO */}
          <View style={styles.hero}>
            <LinearGradient
              colors={['#BEE7E8', '#EAF6F3']}
              style={styles.heroBg}
            />
            <Text style={styles.heroEmoji}>🌾</Text>
            <Text style={styles.title}>Farm Experience</Text>
            <Text style={styles.subtitle}>Farm ID • {id}</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                🌿 Organic • Family Friendly
              </Text>
            </View>
          </View>

          {/* 📖 ABOUT */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>🌱 About this Farm</Text>
            <Text style={styles.text}>
              Enjoy authentic farming with guided tours, hands-on workshops,
              seasonal harvests, and kid-friendly learning experiences.
            </Text>
          </View>

          {/* 💰 PRICING */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>💰 Entry & Booking Price</Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>👨 Adult</Text>
              <Text style={styles.priceValue}>
                {PRICE_ADULT} {CURRENCY}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>🧒 Child</Text>
              <Text style={styles.priceValue}>
                {PRICE_CHILD} {CURRENCY}
              </Text>
            </View>

            <Text style={styles.priceNote}>
              ✔ Includes farm access, activities, and guided tour
            </Text>
          </View>

          {/* 🧺 ACTIVITIES */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>🧺 Activities</Text>
            <Text style={styles.listItem}>🍊 Fruit picking</Text>
            <Text style={styles.listItem}>👩‍🌾 Guided farm tour</Text>
            <Text style={styles.listItem}>🧒 Kids learning zone</Text>
            <Text style={styles.listItem}>🧑‍🍳 Local workshops</Text>
          </View>

          {/* 📸 GALLERY */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📸 Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['🌄', '🌳', '🍊', '🏡'].map((icon, i) => (
                <View key={i} style={styles.galleryItem}>
                  <Text style={{ fontSize: 32 }}>{icon}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* ⭐ REVIEWS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>⭐ Reviews</Text>
            <Text style={styles.rating}>4.8 ★★★★☆ (120 reviews)</Text>
            <Text style={styles.review}>
              “Amazing experience for kids and adults alike!”
            </Text>
            <Text style={styles.reviewAuthor}>— Sarah A.</Text>
          </View>

          {/* 📅 DATE PICKER */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📅 Select Visit Date</Text>
            <View style={styles.dateRow}>
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
            </View>
          </View>

          {/* 👓 AR PREVIEW */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>👓 AR Preview</Text>
            <Pressable
              style={styles.arButton}
              onPress={() => router.push('/visitor/ar-tour')}
            >
              <Text style={styles.arText}>Preview Farm in AR</Text>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* 💳 STICKY PAYMENT CTA */}
      <View style={styles.sticky}>
        <Pressable style={styles.primary}>
          <Text style={styles.primaryText}>
            💳 Pay {PRICE_ADULT} {CURRENCY}
            {selectedDate ? ` • ${selectedDate}` : ''}
          </Text>
          <Text style={styles.paymentHint}>
            Apple Pay • Google Pay • Card
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },

  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  heroBg: { ...StyleSheet.absoluteFillObject },
  heroEmoji: { fontSize: 72 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E7F5C',
  },
  subtitle: { color: '#4B7F73', marginTop: 4 },
  badge: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E7F5C',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1E7F5C',
  },
  text: { color: '#4B7F73', lineHeight: 22 },
  listItem: { marginBottom: 6, color: '#374151' },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  priceLabel: { color: '#374151' },
  priceValue: {
    fontWeight: '700',
    color: '#1E7F5C',
  },
  priceNote: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 12,
  },

  galleryItem: {
    width: 120,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#EAF6F3',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rating: { fontWeight: '700', marginBottom: 4 },
  review: { color: '#374151' },
  reviewAuthor: { color: '#6B7280', fontSize: 12 },

  dateRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dateChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#EAF6F3',
  },
  dateSelected: { backgroundColor: '#1E7F5C' },
  dateText: { color: '#1E7F5C' },
  dateTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  arButton: {
    backgroundColor: '#EAF6F3',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  arText: { color: '#1E7F5C', fontWeight: '600' },

  sticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  primary: {
    backgroundColor: '#1E7F5C',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  paymentHint: {
    marginTop: 4,
    color: '#D1FAE5',
    fontSize: 12,
  },
});
