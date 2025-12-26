import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function ProducerHome() {
  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* ===== HEADER ===== */}
      <LinearGradient
        colors={['#0B3D2E', '#1E7F5C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.greeting}>Good Morning 👋</Text>
        <Text style={styles.subGreeting}>Let’s grow something great today</Text>

        {/* WEATHER GLASS CARD */}
        <BlurView intensity={28} tint="light" style={styles.weatherCard}>
          <View>
            <Text style={styles.temp}>33°</Text>
            <Text style={styles.weatherText}>Cloudy</Text>
          </View>

          <View style={styles.weatherMeta}>
            <Text style={styles.metaText}>💧 Humidity 76%</Text>
            <Text style={styles.metaText}>🌬 Wind 23 m/s</Text>
          </View>
        </BlurView>
      </LinearGradient>

      {/* ===== FEATURED PRODUCT ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Product</Text>

        <Pressable style={({ pressed }) => [
          styles.productCard,
          pressed && { transform: [{ scale: 0.98 }] },
        ]}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5',
            }}
            style={styles.productImage}
          />

          <View style={styles.productBody}>
            <Text style={styles.productName}>Lime Seedlings</Text>
            <Text style={styles.productDesc}>
              Premium quality citrus seedlings, climate-ready & disease-checked.
            </Text>

            <View style={styles.productMeta}>
              <Text style={styles.price}>$30 / pcs</Text>
              <Text style={styles.stock}>120 available</Text>
            </View>
          </View>
        </Pressable>
      </View>

      {/* ===== INSIGHTS ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today’s Insights</Text>

        <View style={styles.insightsRow}>
          <InsightCard value="4.9k" label="Views" />
          <InsightCard value="128" label="Orders" />
          <InsightCard value="$3.2k" label="Revenue" />
        </View>
      </View>
    </ScrollView>
  );
}

/* ===== REUSABLE CARD ===== */

function InsightCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.insightCard}>
      <Text style={styles.insightValue}>{value}</Text>
      <Text style={styles.insightLabel}>{label}</Text>
    </View>
  );
}

/* ================= STYLES — 2026 ================= */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4FBF8',
  },

  header: {
    paddingTop: 64,
    paddingHorizontal: 22,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  greeting: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.4,
  },

  subGreeting: {
    marginTop: 6,
    color: '#DFF5EB',
    fontSize: 14,
  },

  weatherCard: {
    marginTop: 24,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  temp: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F2A1D',
  },

  weatherText: {
    color: '#065F46',
    marginTop: 2,
    fontWeight: '600',
  },

  weatherMeta: {
    justifyContent: 'center',
  },

  metaText: {
    color: '#065F46',
    fontSize: 13,
    marginBottom: 2,
  },

  section: {
    paddingHorizontal: 22,
    marginTop: 32,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F2A1D',
    marginBottom: 14,
    letterSpacing: -0.2,
  },

  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 14,
  },

  productImage: {
    height: 190,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },

  productBody: {
    padding: 16,
  },

  productName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2A1D',
  },

  productDesc: {
    color: '#6B7280',
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },

  productMeta: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    fontWeight: '800',
    color: '#1E7F5C',
    fontSize: 14,
  },

  stock: {
    color: '#6B7280',
    fontSize: 12,
  },

  insightsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  insightCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  insightValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2A1D',
  },

  insightLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },
});
