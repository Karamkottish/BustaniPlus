import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// 📊 Mock Data for Prediction Chart
const CHART_DATA = [50, 80, 45, 90, 60, 100, 70];
const CHART_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

import AgriTechBackground from '@/components/AgriTechBackground';

export default function FarmerDashboard() {
  const router = useRouter();

  return (
    <AgriTechBackground>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* 🌱 HEADER & WEATHER */}
          <View style={styles.header}>
            {/* Header gradient can be semi-transparent now or removed if we want the bg to show through. 
                Keeping it for contrast but maybe adjusting. */}
            <LinearGradient
              colors={['rgba(15, 42, 29, 0.95)', 'rgba(30, 127, 92, 0.9)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerBg}
            />
            <SafeAreaView>
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.greeting}>Hello, Farmer Ali 👋</Text>
                  <Text style={styles.date}>Wednesday, 27 Dec</Text>
                </View>
                <Pressable style={styles.profileBtn}>
                  <ImagePlaceholder initials="FA" />
                </Pressable>
              </View>

              {/* ☁️ SMART WEATHER WIDGET */}
              <BlurView intensity={20} tint="light" style={styles.weatherCard}>
                <View style={styles.weatherMain}>
                  <Text style={styles.temp}>24°C</Text>
                  <View>
                    <Text style={styles.weatherDesc}>Partly Cloudy</Text>
                    <Text style={styles.location}>Riyadh, SA</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.weatherStats}>
                  <View style={styles.stat}>
                    <Ionicons name="water-outline" size={16} color="#A7F3D0" />
                    <Text style={styles.statText}>45% Humidity</Text>
                  </View>
                  <View style={styles.stat}>
                    <MaterialCommunityIcons name="weather-windy" size={16} color="#A7F3D0" />
                    <Text style={styles.statText}>12 km/h Wind</Text>
                  </View>
                </View>
              </BlurView>
            </SafeAreaView>
          </View>

          {/* 🚜 FARM ACTIONS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manage Farm</Text>
            <View style={styles.actionGrid}>
              <ActionCard
                title="Add Farm"
                icon="barn"
                color="#10B981"
                onPress={() => router.push('/farmer/add-farm')}
              />
              <ActionCard
                title="Tree Batches"
                icon="tree"
                color="#3B82F6"
                onPress={() => router.push('/farmer/tree-batches')}
              />
            </View>
          </View>

          {/* 🤖 AI TOOLS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Tools & Insights</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.aiScroll}>

              {/* 🦠 Disease Detection Card */}
              <Pressable style={[styles.aiCard, { backgroundColor: 'rgba(254, 242, 242, 0.9)' }]}>
                <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
                  <MaterialCommunityIcons name="leaf" size={24} color="#EF4444" />
                </View>
                <Text style={[styles.aiTitle, { color: '#991B1B' }]}>Disease Detect</Text>
                <Text style={styles.aiDesc}>Scan leaves to detect pests & diseases instantly.</Text>
                <Pressable style={[styles.btnSmall, { backgroundColor: '#EF4444' }]} onPress={() => router.push('/farmer/disease-detect')}>
                  <Text style={styles.btnText}>Scan Now</Text>
                </Pressable>
              </Pressable>

              {/* 💧 Irrigation Card */}
              <Pressable style={[styles.aiCard, { backgroundColor: 'rgba(239, 246, 255, 0.9)' }]}>
                <View style={[styles.iconCircle, { backgroundColor: '#DBEAFE' }]}>
                  <Ionicons name="water" size={24} color="#3B82F6" />
                </View>
                <Text style={[styles.aiTitle, { color: '#1E40AF' }]}>Smart Irrigation</Text>
                <Text style={styles.aiDesc}>AI-driven watering schedule based on soil data.</Text>
                <Pressable style={[styles.btnSmall, { backgroundColor: '#3B82F6' }]} onPress={() => router.push('/farmer/irrigation')}>
                  <Text style={styles.btnText}>Check Plan</Text>
                </Pressable>
              </Pressable>

            </ScrollView>
          </View>

          {/* 📈 YIELD PREDICTION CHART */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yield Prediction</Text>
            <View style={[styles.chartCard, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartSubtitle}>Expected Harvest (kg)</Text>
                <Text style={styles.chartValue}>+12% vs last week</Text>
              </View>

              {/* Custom SVG Line Chart */}
              <View style={{ height: 120, marginTop: 20 }}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <Defs>
                    <SvgGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#10B981" stopOpacity="0.4" />
                      <Stop offset="1" stopColor="#10B981" stopOpacity="0" />
                    </SvgGradient>
                  </Defs>
                  <Path
                    d="M0 50 L16 20 L32 55 L48 10 L64 40 L80 0 L100 30"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                  />
                  <Path
                    d="M0 50 L16 20 L32 55 L48 10 L64 40 L80 0 L100 30 V 100 H 0 Z"
                    fill="url(#grad)"
                    stroke="none"
                  />
                </Svg>
              </View>
              <View style={styles.chartLabels}>
                {CHART_LABELS.map((l, i) => <Text key={i} style={styles.label}>{l}</Text>)}
              </View>
            </View>
          </View>

        </ScrollView>

        {/* 🟢 FAB ADD BUTTON */}
        <Pressable style={styles.fab} onPress={() => console.log('Quick Add')}>
          <Ionicons name="add" size={32} color="#FFF" />
        </Pressable>
      </View>
    </AgriTechBackground>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ActionCard({ title, icon, color, onPress }: { title: string, icon: any, color: string, onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.actionCard, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
      onPress={onPress}
    >
      <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <View style={styles.actionArrow}>
        <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
      </View>
    </Pressable>
  );
}

function ImagePlaceholder({ initials }: { initials: string }) {
  return (
    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#A7F3D0', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' }}>
      <Text style={{ color: '#065F46', fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'transparent' },

  header: {
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  headerBg: { ...StyleSheet.absoluteFillObject },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 60 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#FFF' },
  date: { color: '#D1FAE5', fontSize: 13, marginTop: 4 },
  profileBtn: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },

  weatherCard: {
    marginTop: 24,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  weatherMain: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  temp: { fontSize: 42, fontWeight: '800', color: '#FFF' },
  weatherDesc: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  location: { color: '#D1FAE5', fontSize: 12 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 12 },
  weatherStats: { flexDirection: 'row', gap: 16 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { color: '#D1FAE5', fontSize: 12, fontWeight: '500' },

  section: { marginTop: 28, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937', marginBottom: 16 },

  actionGrid: { flexDirection: 'row', gap: 16 },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 24,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  actionIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  actionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  actionArrow: { position: 'absolute', top: 16, right: 16 },

  aiScroll: { paddingRight: 24, gap: 16 },
  aiCard: {
    width: width * 0.6,
    padding: 20,
    borderRadius: 28,
  },
  iconCircle: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  aiTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  aiDesc: { fontSize: 13, color: '#4B5563', lineHeight: 18, marginBottom: 16 },
  btnSmall: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, alignSelf: 'flex-start' },
  btnText: { color: '#FFF', fontSize: 12, fontWeight: '700' },

  chartCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  chartSubtitle: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  chartValue: { fontSize: 14, color: '#10B981', fontWeight: '700', backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  label: { fontSize: 10, color: '#9CA3AF' },

  fab: {
    position: 'absolute', bottom: 30, right: 24,
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#1E7F5C',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#1E7F5C', shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  }
});
