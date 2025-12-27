import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mock Data: Soil Moisture over last 6 hours
const MOISTURE_DATA = [30, 32, 28, 25, 20, 18]; // dropping
const LABELS = ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM'];

export default function SmartIrrigationScreen() {
    const router = useRouter();

    const currentMoisture = MOISTURE_DATA[MOISTURE_DATA.length - 1];
    const isCritical = currentMoisture < 25;

    return (
        <View style={styles.container}>
            {/* 🔙 HEADER */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <BlurView intensity={20} style={styles.blurBtn}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </BlurView>
                </Pressable>
                <Text style={styles.headerTitle}>Smart Irrigation</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>

                {/* 💧 STATUS CARD */}
                <LinearGradient
                    colors={isCritical ? ['#EF4444', '#B91C1C'] : ['#3B82F6', '#1E40AF']}
                    style={styles.statusCard}
                >
                    <View style={styles.statusContent}>
                        <Text style={styles.statusTitle}>Soil Moisture</Text>
                        <Text style={styles.statusValue}>{currentMoisture}%</Text>
                        <Text style={styles.statusDesc}>
                            {isCritical ? 'CRITICAL LEVEL: Watering Needed!' : 'Optimal Range'}
                        </Text>
                    </View>
                    <View style={styles.statusIcon}>
                        <Ionicons name={isCritical ? "warning" : "water"} size={64} color="rgba(255,255,255,0.3)" />
                    </View>
                </LinearGradient>

                <Text style={styles.sectionTitle}>Moisture Trend (Last 6h)</Text>

                {/* 📊 CHART (Simple Bar) */}
                <View style={styles.chartCard}>
                    <Svg width="100%" height="150">
                        {MOISTURE_DATA.map((val, i) => {
                            const barHeight = (val / 50) * 100;
                            return (
                                <Rect
                                    key={i}
                                    x={i * (width / 7) + 20}
                                    y={120 - barHeight}
                                    width={20}
                                    height={barHeight}
                                    fill={val < 25 ? '#EF4444' : '#3B82F6'}
                                    rx={6}
                                />
                            );
                        })}
                        {LABELS.map((label, i) => (
                            <SvgText
                                key={i}
                                x={i * (width / 7) + 30}
                                y="140"
                                fontSize="10"
                                fill="#9CA3AF"
                                textAnchor="middle"
                            >
                                {label}
                            </SvgText>
                        ))}
                    </Svg>
                </View>

                {/* ⚙️ SCHEDULE */}
                <Text style={styles.sectionTitle}>AI Recommendation</Text>

                <View style={styles.recommendationCard}>
                    <View style={styles.recHeader}>
                        <Ionicons name="sparkles" size={20} color="#8B5CF6" />
                        <Text style={styles.recTitle}>Suggested Action</Text>
                    </View>
                    <Text style={styles.recText}>
                        Soil moisture has dropped below 25%. We recommend running Sector B sprinklers for <Text style={{ fontWeight: '700', color: '#3B82F6' }}>20 minutes</Text> starting at 4:30 PM.
                    </Text>

                    <Pressable style={styles.applyBtn}>
                        <Text style={styles.applyText}>Apply Schedule</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#0F2A1D',
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
    backBtn: { borderRadius: 12, overflow: 'hidden' },
    blurBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },

    scroll: { padding: 24 },

    statusCard: {
        borderRadius: 24, padding: 24, flexDirection: 'row', justifyContent: 'space-between',
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 8 },
    },
    statusTitle: { color: '#E0E7FF', fontSize: 14, fontWeight: '600', marginBottom: 4 },
    statusValue: { color: '#FFF', fontSize: 42, fontWeight: '900' },
    statusDesc: { color: '#FFF', fontSize: 14, fontWeight: '700', marginTop: 4 },
    statusIcon: { justifyContent: 'center' },
    statusContent: { flex: 1 },

    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937', marginTop: 32, marginBottom: 16 },

    chartCard: {
        backgroundColor: '#FFF', padding: 16, borderRadius: 24,
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10
    },

    recommendationCard: {
        backgroundColor: '#FFF', padding: 20, borderRadius: 24, borderLeftWidth: 4, borderLeftColor: '#8B5CF6',
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10
    },
    recHeader: { flexDirection: 'row', gap: 8, marginBottom: 12, alignItems: 'center' },
    recTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
    recText: { color: '#4B5563', lineHeight: 22 },

    applyBtn: { marginTop: 20, backgroundColor: '#1E7F5C', padding: 14, borderRadius: 16, alignItems: 'center' },
    applyText: { color: '#FFF', fontWeight: '700' },
});
