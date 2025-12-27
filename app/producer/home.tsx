import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AgriTechBackground from '@/components/AgriTechBackground';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Reusing ImagePlaceholder for consistency if available, otherwise defining minimal one
const ImagePlaceholder = ({ initials }: { initials: string }) => (
  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#D97706', fontWeight: '800' }}>{initials}</Text>
  </View>
);

const { width } = Dimensions.get('window');

export default function ProducerHome() {
  const router = useRouter();

  return (
    <AgriTechBackground>
      <View style={styles.container}>
        {/* 🌱 HEADER */}
        <View style={styles.header}>
          <LinearGradient
            colors={['rgba(15, 42, 29, 0.8)', 'rgba(30, 127, 92, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerBg}
          />
          <SafeAreaView>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.greeting}>Good Morning,</Text>
                <Text style={styles.name}>Producer John</Text>
              </View>
              <Pressable style={styles.profileBtn}>
                <ImagePlaceholder initials="PJ" />
              </Pressable>
            </View>

            {/* 📊 QUICK STATS - HERO */}
            <Animated.View entering={FadeInDown.delay(200)} style={styles.heroStats}>
              <BlurView intensity={30} tint="light" style={styles.statRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Output</Text>
                  <Text style={styles.statValue}>8,420 <Text style={styles.unit}>kg</Text></Text>
                  <Text style={styles.growth}>+12.5% ↗</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Revenue</Text>
                  <Text style={styles.statValue}>$12.5k</Text>
                  <Text style={styles.growth}>+4.2% ↗</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Efficiency</Text>
                  <Text style={styles.statValue}>94%</Text>
                  <Text style={styles.growth}>stable</Text>
                </View>
              </BlurView>
            </Animated.View>
          </SafeAreaView>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* 🚨 RECENT ALERTS */}
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { marginBottom: 10 }]}>
              <Text style={styles.sectionTitle}>System Alerts</Text>
              <Pressable><Text style={styles.seeAll}>See All</Text></Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.alertsScroll}>
              <AlertCard type="warning" title="Pest Risk High" desc="Sector B - Citrus Grove" time="2h ago" />
              <AlertCard type="info" title="Water Tank Low" desc="Refill needed in Tank 4" time="5h ago" />
              <AlertCard type="success" title="Harvest Complete" desc="20 crates packed" time="1d ago" />
            </ScrollView>
          </View>

          {/* 🚜 ACTIVE FARMS - MAP PREVIEW */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Farms</Text>
            <View style={styles.mapCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1524486361537-8ad15938f1a3?q=80&w=800' }}
                style={styles.mapImage}
              />
              <BlurView intensity={60} style={styles.mapOverlay}>
                <View style={styles.mapRow}>
                  <Ionicons name="location" size={16} color="#EF4444" />
                  <Text style={styles.mapText}>3 Active Sectors</Text>
                </View>
                <Pressable style={styles.viewMapBtn}>
                  <Text style={styles.viewMapText}>View Map</Text>
                </Pressable>
              </BlurView>
            </View>
          </View>

          {/* 📈 PRODUCTION INSIGHTS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Production Breakdown</Text>
            <View style={styles.grid}>
              <InsightCard title="Citrus" value="45%" color="#F59E0B" icon="fruit-citrus" />
              <InsightCard title="Olives" value="30%" color="#65A30D" icon="basket" />
              <InsightCard title="Dates" value="15%" color="#78350F" icon="palm-tree" />
              <InsightCard title="Other" value="10%" color="#64748B" icon="leaf" />
            </View>
          </View>

        </ScrollView>
      </View>
    </AgriTechBackground>
  );
}

function AlertCard({ type, title, desc, time }: any) {
  const colors = type === 'warning' ? ['#FEF2F2', '#EF4444'] : type === 'info' ? ['#EFF6FF', '#3B82F6'] : ['#F0FDF4', '#10B981'];
  const icons = type === 'warning' ? 'alert-triangle' : type === 'info' ? 'water' : 'check-circle';

  return (
    <Animated.View entering={SlideInRight} style={[styles.alertCard, { backgroundColor: colors[0], borderColor: colors[1] + '40' }]}>
      <View style={[styles.alertIcon, { backgroundColor: colors[1] + '20' }]}>
        <Ionicons name={icons as any} size={20} color={colors[1]} />
      </View>
      <View>
        <Text style={[styles.alertTitle, { color: '#374151' }]}>{title}</Text>
        <Text style={styles.alertDesc}>{desc}</Text>
        <Text style={styles.alertTime}>{time}</Text>
      </View>
    </Animated.View>
  );
}

function InsightCard({ title, value, color, icon }: any) {
  return (
    <BlurView intensity={40} tint="light" style={styles.insightCard}>
      <View style={[styles.insightIconBox, { backgroundColor: color + '20' }]}>
        <MaterialCommunityIcons name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.insightValue}>{value}</Text>
      <Text style={styles.insightTitle}>{title}</Text>
      <View style={[styles.progressBar, { backgroundColor: color + '20' }]}>
        <View style={[styles.progressFill, { width: value, backgroundColor: color }]} />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingBottom: 24, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden' },
  headerBg: { ...StyleSheet.absoluteFillObject },
  headerContent: { paddingHorizontal: 20, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  name: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  profileBtn: { padding: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 24 },

  heroStats: { marginHorizontal: 20, marginTop: 24 },
  statRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 20, padding: 16, justifyContent: 'space-between' },
  statItem: { alignItems: 'center', flex: 1 },
  statLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#0F2A1D' },
  unit: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  growth: { fontSize: 11, color: '#10B981', fontWeight: '700', marginTop: 4 },
  verticalDivider: { width: 1, backgroundColor: '#E5E7EB', marginHorizontal: 8 },

  scroll: { paddingBottom: 120 },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  seeAll: { color: '#10B981', fontWeight: '600', fontSize: 14 },

  alertsScroll: { gap: 12, paddingRight: 20 },
  alertCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, paddingRight: 24, borderRadius: 16, borderWidth: 1, minWidth: 260
  },
  alertIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  alertTitle: { fontWeight: '700', fontSize: 14 },
  alertDesc: { color: '#6B7280', fontSize: 12 },
  alertTime: { color: '#9CA3AF', fontSize: 10, marginTop: 4 },

  mapCard: { height: 180, borderRadius: 24, overflow: 'hidden', marginTop: 12, position: 'relative' },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: {
    position: 'absolute', bottom: 12, left: 12, right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 16, padding: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  mapRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  mapText: { fontWeight: '700', color: '#374151', fontSize: 14 },
  viewMapBtn: { backgroundColor: '#10B981', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  viewMapText: { color: '#FFF', fontSize: 12, fontWeight: '700' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  insightCard: {
    width: (width - 52) / 2, padding: 16, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: '#FFF'
  },
  insightIconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  insightValue: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  insightTitle: { color: '#6B7280', fontSize: 12, marginBottom: 8, fontWeight: '600' },
  progressBar: { height: 4, borderRadius: 2, backgroundColor: '#E5E7EB', width: '100%' },
  progressFill: { height: '100%', borderRadius: 2 },
});
