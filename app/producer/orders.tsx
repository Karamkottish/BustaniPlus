import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AgriTechBackground from '@/components/AgriTechBackground';
import Animated, { FadeInDown, Layout, SlideInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// 📦 Wholesale Mock Data for Producer
// Producers deal with larger quantities (Distributors, Supermarkets)
const ORDERS = [
  {
    id: 'PO-8821',
    client: 'FreshMarket Chains',
    type: 'Wholesale',
    items: '2.5 Tons • Citrus (Oranges)',
    value: '$4,200',
    status: 'Pending',
    date: 'Today, 09:30 AM',
    priority: 'High',
    logo: 'FM'
  },
  {
    id: 'PO-8820',
    client: 'Global Exports Ltd',
    type: 'Export',
    items: '10 Tons • Dates (Ajwa)',
    value: '$45,000',
    status: 'Processing',
    date: 'Yesterday',
    priority: 'Critical',
    logo: 'GE'
  },
  {
    id: 'PO-8819',
    client: 'Local Juicery Hub',
    type: 'Wholesale',
    items: '500 kg • Lemons',
    value: '$850',
    status: 'Ready',
    date: 'Oct 24',
    priority: 'Normal',
    logo: 'LJ'
  },
  {
    id: 'PO-8815',
    client: 'GreenGrocer Co.',
    type: 'Wholesale',
    items: '1.2 Tons • Olives',
    value: '$3,100',
    status: 'Delivered',
    date: 'Oct 22',
    priority: 'Normal',
    logo: 'GG'
  },
];

const TABS = ['All', 'Pending', 'Processing', 'Delivered'];

export default function ProducerOrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = ORDERS.filter(order => {
    const matchesTab = activeTab === 'All' || order.status === activeTab;
    const matchesSearch = order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <AgriTechBackground>
      <View style={styles.container}>
        {/* 📋 HEADER */}
        <View style={styles.header}>
          <LinearGradient
            colors={['rgba(15, 42, 29, 0.9)', 'rgba(30, 127, 92, 0.0)']}
            style={StyleSheet.absoluteFillObject}
          />
          <SafeAreaViewWrapper>
            <View style={styles.headerContent}>
              <Pressable onPress={() => router.back()} style={styles.backBtn}>
                <BlurView intensity={30} tint="light" style={styles.blurBtn}>
                  <Ionicons name="arrow-back" size={24} color="#FFF" />
                </BlurView>
              </Pressable>
              <Text style={styles.headerTitle}>Wholesale Orders</Text>
              <Pressable style={styles.filterBtn}>
                <Ionicons name="filter" size={24} color="#FFF" />
              </Pressable>
            </View>

            {/* 🔍 SEARCH */}
            <View style={styles.searchBox}>
              <BlurView intensity={20} style={styles.searchBlur}>
                <Ionicons name="search" size={20} color="#E5E7EB" />
                <TextInput
                  placeholder="Search PO # or Client..."
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </BlurView>
            </View>

            {/* 📑 TABS */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
              {TABS.map(tab => (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tab, activeTab === tab && styles.tabActive]}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </SafeAreaViewWrapper>
        </View>

        {/* 📦 ORDER LIST */}
        <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No orders found.</Text>
            </View>
          ) : (
            <View style={styles.list}>
              {filteredOrders.map((order, index) => (
                <OrderCard key={order.id} order={order} index={index} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </AgriTechBackground>
  );
}

function OrderCard({ order, index }: any) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
      style={styles.cardContainer}
    >
      <BlurView intensity={60} tint="light" style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.clientRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>{order.logo}</Text>
            </View>
            <View>
              <Text style={styles.clientName}>{order.client}</Text>
              <Text style={styles.poNumber}>{order.id} • {order.type}</Text>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <StatusDot status={order.status} />
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.label}>Order Volume</Text>
            <Text style={styles.value}>{order.items}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>Total Value</Text>
            <Text style={styles.valueHighlight}>{order.value}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.dateRow}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text style={styles.dateText}>{order.date}</Text>
          </View>

          {order.priority === 'Critical' && (
            <View style={styles.priorityTag}>
              <Ionicons name="flame" size={12} color="#FFF" />
              <Text style={styles.priorityText}>Urgent</Text>
            </View>
          )}

          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionText}>Manage</Text>
            <Ionicons name="chevron-forward" size={16} color="#0F2A1D" />
          </Pressable>
        </View>
      </BlurView>
    </Animated.View>
  );
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'Pending' ? '#F59E0B' :
      status === 'Processing' ? '#3B82F6' :
        status === 'Delivered' ? '#10B981' : '#6B7280';
  return <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, marginRight: 6 }} />;
}

// Helper to handle safe area if not using SafeAreaView directly
const SafeAreaViewWrapper = ({ children }: any) => (
  <View style={{ paddingTop: 40, paddingBottom: 10 }}>{children}</View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden' },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFF' },

  backBtn: { borderRadius: 12, overflow: 'hidden' },
  blurBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  filterBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

  searchBox: { paddingHorizontal: 20, marginBottom: 16 },
  searchBlur: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 50, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#FFF' },

  tabsScroll: { paddingHorizontal: 20, gap: 10 },
  tab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  tabActive: { backgroundColor: '#FFF', borderColor: '#FFF' },
  tabText: { color: '#E5E7EB', fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#0F2A1D', fontWeight: '700' },

  listScroll: { padding: 20, paddingBottom: 100 },
  list: { gap: 16 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#FFF', opacity: 0.6 },

  cardContainer: {},
  card: { borderRadius: 24, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', overflow: 'hidden' },

  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  clientRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  logoBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontWeight: '800', color: '#374151' },
  clientName: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  poNumber: { fontSize: 12, color: '#6B7280' },

  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '600', color: '#374151' },

  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 12 },

  detailsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 11, color: '#6B7280', marginBottom: 2 },
  value: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  valueHighlight: { fontSize: 16, fontWeight: '800', color: '#10B981' },

  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 12, color: '#6B7280' },

  priorityTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  priorityText: { color: '#FFF', fontSize: 10, fontWeight: '700' },

  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 8 },
  actionText: { color: '#0F2A1D', fontSize: 12, fontWeight: '700' },
});
