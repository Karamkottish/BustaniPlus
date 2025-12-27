import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Dimensions,
    Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AgriTechBackground from '@/components/AgriTechBackground';
import Animated, { FadeIn, FadeInDown, SlideInDown, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// 🌳 Rich Mock Data representing Real Agricultural Metrics
const BATCHES = [
    {
        id: '1',
        name: 'Alpha Grove',
        count: 120,
        type: 'Palm (Ajwa)',
        age: '2 yrs',
        health: 'Good',
        details: {
            soilPH: '7.2 (Neutral)',
            lastHarvest: 'Sept 15, 2024',
            nextHarvest: 'Sept 10, 2025',
            irrigation: 'Drip System - Active',
            fertilizer: 'Nitrogen Boost needed in 5 days',
            pestRisk: 'Low',
            yieldForecast: 'High (+15%)'
        }
    },
    {
        id: '2',
        name: 'Beta Sector',
        count: 50,
        type: 'Citrus (Orange)',
        age: '1 yr',
        health: 'Attention',
        details: {
            soilPH: '5.8 (Acidic)',
            lastHarvest: 'N/A (Maturing)',
            nextHarvest: 'Dec 01, 2025',
            irrigation: 'Sprinkler - Scheduled 4:00 PM',
            fertilizer: 'Iron Chelate applied yesterday',
            pestRisk: 'Moderate (Aphids)',
            yieldForecast: 'Normal'
        }
    },
    {
        id: '3',
        name: 'Gamma Nursery',
        count: 300,
        type: 'Wheat',
        age: '3 months',
        health: 'Excellent',
        details: {
            soilPH: '6.5 (Optimal)',
            lastHarvest: 'June 2024',
            nextHarvest: 'May 2025',
            irrigation: 'Pivot - Inactive',
            fertilizer: 'Complete Mix',
            pestRisk: 'Very Low',
            yieldForecast: 'Excellent (+20%)'
        }
    },
];

export default function TreeBatchesScreen() {
    const router = useRouter();
    const [selectedBatch, setSelectedBatch] = useState<typeof BATCHES[0] | null>(null);

    return (
        <AgriTechBackground>
            <View style={styles.container}>
                {/* 🔙 HEADER */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backBtn}>
                        <BlurView intensity={30} tint="light" style={styles.blurBtn}>
                            <Ionicons name="arrow-back" size={24} color="#0F2A1D" />
                        </BlurView>
                    </Pressable>
                    <Text style={styles.headerTitle}>Tree Batches</Text>
                    <Pressable style={styles.addBtn}>
                        <Ionicons name="add" size={24} color="#FFF" />
                    </Pressable>
                </View>

                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                    {/* 📊 SUMMARY */}
                    <Animated.View entering={FadeInDown.delay(100).springify()}>
                        <View style={styles.summaryRow}>
                            <SummaryCard label="Total Trees" value="470" icon="tree" color="#10B981" />
                            <SummaryCard label="Batches" value="3" icon="layers" color="#3B82F6" />
                        </View>
                    </Animated.View>

                    <Text style={styles.sectionTitle}>Active Batches</Text>

                    <View style={styles.list}>
                        {BATCHES.map((batch, index) => (
                            <Animated.View
                                key={batch.id}
                                entering={FadeInDown.delay(200 + index * 100).springify()}
                            >
                                <Pressable
                                    style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                                    onPress={() => setSelectedBatch(batch)}
                                >
                                    <View style={styles.cardHeader}>
                                        <View style={[styles.iconBox, { backgroundColor: batch.type.includes('Palm') ? '#FEF3C7' : '#E0F2FE' }]}>
                                            <MaterialCommunityIcons name="tree" size={24} color={batch.type.includes('Palm') ? '#D97706' : '#0284C7'} />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 12 }}>
                                            <Text style={styles.batchName}>{batch.name}</Text>
                                            <Text style={styles.batchType}>{batch.type}</Text>
                                        </View>
                                        <StatusBadge status={batch.health} />
                                    </View>

                                    <View style={styles.divider} />

                                    <View style={styles.statsRow}>
                                        <StatItem label="Count" value={batch.count} />
                                        <StatItem label="Age" value={batch.age} />

                                        <Pressable style={styles.actionBtn}>
                                            <Text style={styles.actionText}>View Details</Text>
                                            <Ionicons name="scan-outline" size={14} color="#1E7F5C" />
                                        </Pressable>
                                    </View>
                                </Pressable>
                            </Animated.View>
                        ))}
                    </View>
                </ScrollView>

                {/* 🌟 DETAIL MODAL POPUP */}
                <Modal
                    visible={!!selectedBatch}
                    transparent
                    animationType="none"
                    onRequestClose={() => setSelectedBatch(null)}
                >
                    {selectedBatch && (
                        <View style={styles.modalOverlay}>
                            <Pressable style={StyleSheet.absoluteFill} onPress={() => setSelectedBatch(null)}>
                                <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
                            </Pressable>

                            <Animated.View entering={ZoomIn.springify()} style={styles.modalContent}>
                                <LinearGradient
                                    colors={['#FFFFFF', '#F8FAFC']}
                                    style={styles.modalCard}
                                >
                                    {/* Modal Header */}
                                    <View style={styles.modalHeader}>
                                        <View>
                                            <Text style={styles.modalTitle}>{selectedBatch.name}</Text>
                                            <Text style={styles.modalSubtitle}>{selectedBatch.type} • {selectedBatch.age} old</Text>
                                        </View>
                                        <Pressable onPress={() => setSelectedBatch(null)} style={styles.closeBtn}>
                                            <Ionicons name="close" size={20} color="#6B7280" />
                                        </Pressable>
                                    </View>

                                    <View style={styles.modalDivider} />

                                    {/* Real Stats Grid */}
                                    <View style={styles.grid}>
                                        <DetailItem icon="water" label="Irrigation" value={selectedBatch.details.irrigation} />
                                        <DetailItem icon="flask" label="Soil pH" value={selectedBatch.details.soilPH} />
                                        <DetailItem icon="calendar" label="Next Harvest" value={selectedBatch.details.nextHarvest} />
                                        <DetailItem icon="leaf" label="Fertilizer" value={selectedBatch.details.fertilizer} />
                                        <DetailItem icon="bug" label="Pest Risk" value={selectedBatch.details.pestRisk} warning={selectedBatch.details.pestRisk !== 'Low' && selectedBatch.details.pestRisk !== 'Very Low'} />
                                    </View>

                                    {/* AI Insight */}
                                    <View style={styles.insightBox}>
                                        <View style={styles.insightHeader}>
                                            <MaterialCommunityIcons name="robot" size={18} color="#8B5CF6" />
                                            <Text style={styles.insightTitle}>AI Forecast</Text>
                                        </View>
                                        <Text style={styles.insightText}>
                                            Yield is expected to be <Text style={{ fontWeight: '700', color: '#10B981' }}>{selectedBatch.details.yieldForecast}</Text>.
                                            Ensure irrigation schedule is maintained.
                                        </Text>
                                    </View>

                                    <Pressable style={styles.fullReportBtn}>
                                        <Text style={styles.fullReportText}>Download Full Report</Text>
                                        <Ionicons name="download-outline" size={18} color="#FFF" />
                                    </Pressable>

                                </LinearGradient>
                            </Animated.View>
                        </View>
                    )}
                </Modal>
            </View>
        </AgriTechBackground>
    );
}

/* --- Sub Components --- */

function SummaryCard({ label, value, icon, color }: any) {
    return (
        <BlurView intensity={40} tint="light" style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.summaryValue}>{value}</Text>
            <Text style={styles.summaryLabel}>{label}</Text>
        </BlurView>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isGood = status === 'Good' || status === 'Excellent';
    return (
        <View style={[styles.statusBadge, { backgroundColor: isGood ? '#DCFCE7' : '#FEE2E2' }]}>
            <Text style={[styles.statusText, { color: isGood ? '#166534' : '#991B1B' }]}>
                {status}
            </Text>
        </View>
    );
}

function StatItem({ label, value }: { label: string, value: any }) {
    return (
        <View>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );
}

function DetailItem({ icon, label, value, warning }: any) {
    return (
        <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: warning ? '#FEF2F2' : '#F0FDF4' }]}>
                <Ionicons name={icon} size={18} color={warning ? '#EF4444' : '#10B981'} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={[styles.detailValue, warning && { color: '#B45309' }]}>{value}</Text>
            </View>
        </View>
    );
}


/* --- Styles --- */
const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    headerTitle: { color: '#0F2A1D', fontSize: 20, fontWeight: '800' },
    backBtn: { borderRadius: 12, overflow: 'hidden' },
    addBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#1E7F5C', alignItems: 'center', justifyContent: 'center', shadowColor: '#1E7F5C', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
    blurBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

    scroll: { padding: 20, paddingBottom: 100 },

    summaryRow: { flexDirection: 'row', gap: 16, marginBottom: 30 },
    summaryCard: {
        flex: 1, padding: 16, borderRadius: 20, overflow: 'hidden',
        alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)',
    },
    summaryIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    summaryValue: { fontSize: 24, fontWeight: '800', color: '#1F2937' },
    summaryLabel: { fontSize: 12, color: '#6B7280' },

    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 16 },

    list: { gap: 16 },
    card: {
        backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 24, padding: 16,
        borderWidth: 1, borderColor: '#FFF',
        shadowColor: '#10B981', shadowOpacity: 0.1, shadowRadius: 10, elevation: 3
    },
    cardPressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    batchName: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
    batchType: { fontSize: 13, color: '#6B7280' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 11, fontWeight: '700' },

    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 12 },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statLabel: { fontSize: 11, color: '#9CA3AF' },
    statValue: { fontSize: 15, fontWeight: '600', color: '#374151' },
    actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
    actionText: { color: '#1E7F5C', fontWeight: '600', fontSize: 12 },

    // Modal Styles
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalContent: { width: '100%', maxWidth: 400 },
    modalCard: {
        borderRadius: 32, padding: 24,
        shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 30, elevation: 20,
    },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalTitle: { fontSize: 22, fontWeight: '800', color: '#0F2A1D' },
    modalSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
    closeBtn: { padding: 8, backgroundColor: '#F3F4F6', borderRadius: 20 },

    modalDivider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 20 },

    grid: { gap: 16 },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    detailIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    detailLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
    detailValue: { fontSize: 15, color: '#1F2937', fontWeight: '600' },

    insightBox: {
        marginTop: 24, backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16,
        borderLeftWidth: 4, borderLeftColor: '#8B5CF6'
    },
    insightHeader: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 6 },
    insightTitle: { color: '#7C3AED', fontWeight: '700', fontSize: 14 },
    insightText: { color: '#4B5563', fontSize: 13, lineHeight: 20 },

    fullReportBtn: {
        marginTop: 24, backgroundColor: '#1E7F5C', paddingVertical: 16, borderRadius: 18,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    fullReportText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
