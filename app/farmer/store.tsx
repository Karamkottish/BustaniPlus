import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AgriTechBackground from '@/components/AgriTechBackground';
import Animated, { FadeInDown, Layout, ZoomIn, SlideOutRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// 📦 Mock Order Data
type OrderStatus = 'Pending' | 'Processing' | 'Ready' | 'Delivered';

interface Order {
    id: string;
    customer: string;
    items: string[];
    total: string;
    status: OrderStatus;
    time: string;
    avatar: string;
}

const INITIAL_ORDERS: Order[] = [
    {
        id: 'ORD-2451',
        customer: 'Sarah M.',
        items: ['2x Fresh Orange Juice (1L)', '1x Citrus Shea Soap'],
        total: '$55.00',
        status: 'Pending',
        time: '10 mins ago',
        avatar: 'S'
    },
    {
        id: 'ORD-2450',
        customer: 'Hotel Grand Estate',
        items: ['50x Lemon & Mint Splash (500ml)', '10x Honey Soap'],
        total: '$705.00',
        status: 'Pending',
        time: '35 mins ago',
        avatar: 'H'
    },
    {
        id: 'ORD-2449',
        customer: 'Ahmed K.',
        items: ['1x Grapefruit Glow (750ml)'],
        total: '$18.00',
        status: 'Processing',
        time: '1 hour ago',
        avatar: 'A'
    },
    {
        id: 'ORD-2445',
        customer: 'Organic Cafe',
        items: ['20x Pure Orange Zest'],
        total: '$300.00',
        status: 'Ready',
        time: '3 hours ago',
        avatar: 'O'
    },
];

const TABS = ['Pending', 'Processing', 'Ready', 'History'];

export default function OrderManagementScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Pending');
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

    // Filter Logic
    const filteredOrders = orders.filter(o => {
        if (activeTab === 'History') return o.status === 'Delivered';
        return o.status === activeTab;
    });

    // Actions
    const updateStatus = (id: string, newStatus: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    const getNextStatus = (current: OrderStatus): OrderStatus | null => {
        if (current === 'Pending') return 'Processing';
        if (current === 'Processing') return 'Ready';
        if (current === 'Ready') return 'Delivered';
        return null;
    };

    const getActionLabel = (current: OrderStatus) => {
        if (current === 'Pending') return 'Accept Order';
        if (current === 'Processing') return 'Mark Ready';
        if (current === 'Ready') return 'Complete';
        return null;
    };

    return (
        <AgriTechBackground>
            <View style={styles.container}>
                {/* 📋 HEADER */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backBtn}>
                        <BlurView intensity={30} tint="light" style={styles.blurBtn}>
                            <Ionicons name="arrow-back" size={24} color="#0F2A1D" />
                        </BlurView>
                    </Pressable>
                    <View>
                        <Text style={styles.headerTitle}>Order Management</Text>
                        <Text style={styles.headerSubtitle}>Revenue today: <Text style={{ fontWeight: '800', color: '#10B981' }}>$1,078</Text></Text>
                    </View>
                    <Pressable style={styles.reportBtn}>
                        <Ionicons name="stats-chart" size={20} color="#1E7F5C" />
                    </Pressable>
                </View>

                {/* 📑 TABS */}
                <View style={styles.tabContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
                        {TABS.map(tab => {
                            const count = orders.filter(o => {
                                if (tab === 'History') return o.status === 'Delivered';
                                return o.status === tab;
                            }).length;

                            return (
                                <Pressable
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    style={[styles.tab, activeTab === tab && styles.tabActive]}
                                >
                                    <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                        {tab}
                                    </Text>
                                    {count > 0 && (
                                        <View style={[styles.badge, activeTab === tab ? { backgroundColor: '#FFF' } : { backgroundColor: '#10B981' }]}>
                                            <Text style={[styles.badgeText, activeTab === tab ? { color: '#10B981' } : { color: '#FFF' }]}>{count}</Text>
                                        </View>
                                    )}
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* 📦 ORDERS LIST */}
                <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
                    {filteredOrders.length === 0 ? (
                        <View style={styles.emptyState}>
                            <MaterialCommunityIcons name="clipboard-check-outline" size={64} color="#10B981" style={{ opacity: 0.5 }} />
                            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} orders</Text>
                        </View>
                    ) : (
                        <View style={styles.list}>
                            {filteredOrders.map((order, index) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onAction={() => {
                                        const next = getNextStatus(order.status);
                                        if (next) updateStatus(order.id, next);
                                    }}
                                    actionLabel={getActionLabel(order.status)}
                                    index={index}
                                />
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </AgriTechBackground>
    );
}

function OrderCard({ order, onAction, actionLabel, index }: any) {
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            layout={Layout.springify()}
            exiting={SlideOutRight}
        >
            <BlurView intensity={60} tint="light" style={styles.card}>
                {/* Header */}
                <View style={styles.cardHeader}>
                    <View style={styles.userRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{order.avatar}</Text>
                        </View>
                        <View>
                            <Text style={styles.customerName}>{order.customer}</Text>
                            <Text style={styles.orderId}>{order.id} • {order.time}</Text>
                        </View>
                    </View>
                    <View style={styles.priceTag}>
                        <Text style={styles.priceText}>{order.total}</Text>
                    </View>
                </View>

                {/* Items */}
                <View style={styles.itemsBox}>
                    {order.items.map((item: string, i: number) => (
                        <Text key={i} style={styles.itemText}>• {item}</Text>
                    ))}
                </View>

                {/* Action Footer */}
                {actionLabel && (
                    <View style={styles.footer}>
                        <Pressable style={styles.actionBtn} onPress={onAction}>
                            <Text style={styles.actionBtnText}>{actionLabel}</Text>
                            <Ionicons name="arrow-forward" size={16} color="#FFF" />
                        </Pressable>
                    </View>
                )}
            </BlurView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: 60, paddingBottom: 10, paddingHorizontal: 20,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    backBtn: { borderRadius: 12, overflow: 'hidden' },
    blurBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

    headerTitle: { color: '#0F2A1D', fontSize: 20, fontWeight: '800' },
    headerSubtitle: { color: '#4B5563', fontSize: 13, marginTop: 2 },

    reportBtn: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: '#E6FFFA',
        alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#10B981'
    },

    tabContainer: { marginVertical: 16, height: 50 },
    tabScroll: { paddingHorizontal: 20, gap: 12, alignItems: 'center' },
    tab: {
        paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20,
        flexDirection: 'row', alignItems: 'center', gap: 8,
        backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: '#FFF'
    },
    tabActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
    tabText: { fontWeight: '600', color: '#4B5563' },
    tabTextActive: { color: '#FFF' },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, minWidth: 20, alignItems: 'center' },
    badgeText: { fontSize: 10, fontWeight: '800' },

    listScroll: { padding: 20, paddingBottom: 100 },
    list: { gap: 16 },

    emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100, gap: 16 },
    emptyText: { color: '#9CA3AF', fontSize: 16, fontWeight: '600' },

    card: {
        borderRadius: 24, padding: 16,
        borderWidth: 1, borderColor: '#FFF', overflow: 'hidden',
        shadowColor: '#10B981', shadowOpacity: 0.1, shadowRadius: 10,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    userRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: '#D97706', fontWeight: '800', fontSize: 16 },
    customerName: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
    orderId: { fontSize: 12, color: '#6B7280' },
    priceTag: { backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    priceText: { color: '#059669', fontWeight: '800' },

    itemsBox: { backgroundColor: 'rgba(255,255,255,0.5)', padding: 12, borderRadius: 12, marginBottom: 16 },
    itemText: { fontSize: 13, color: '#4B5563', marginBottom: 4, fontWeight: '500' },

    footer: { flexDirection: 'row', justifyContent: 'flex-end' },
    actionBtn: {
        backgroundColor: '#1E7F5C', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14,
        flexDirection: 'row', alignItems: 'center', gap: 8
    },
    actionBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
});
