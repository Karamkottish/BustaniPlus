import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ScrollView,
    Dimensions,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    FadeIn,
    FadeOut,
    SlideInUp,
} from 'react-native-reanimated';
import AgriTechBackground from '@/components/AgriTechBackground';

const { width } = Dimensions.get('window');

// 🧬 Mock AI Analysis Database
const MOCK_RESULTS = [
    {
        name: 'Leaf Spot (Cercospora)',
        confidence: '98.5%',
        severity: 'Critical',
        treatment: 'Immediate application of copper fungicide required. Prune infected leaves.',
        icon: 'biohazard',
        color: '#EF4444',
    },
    {
        name: 'Healthy Crop',
        confidence: '99.9%',
        severity: 'None',
        treatment: 'Keep up the good work! Maintain regular watering schedule.',
        icon: 'check-decagram',
        color: '#10B981',
    },
    {
        name: 'Aphid Infestation',
        confidence: '87.2%',
        severity: 'Moderate',
        treatment: 'Introduce ladybugs or apply neem oil spray every 3 days.',
        icon: 'ladybug',
        color: '#F59E0B',
    }
];

export default function DiseaseDetectScreen() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    // 🔍 Scanning Animation Values
    const scanLineY = useSharedValue(0);
    const scanOpacity = useSharedValue(0);

    const startScanAnimation = () => {
        scanOpacity.value = 1;
        scanLineY.value = withRepeat(
            withSequence(
                withTiming(width - 40, { duration: 1500, easing: Easing.linear }),
                withTiming(0, { duration: 1500, easing: Easing.linear })
            ),
            -1,
            true
        );
    };

    const stopScanAnimation = () => {
        scanOpacity.value = 0;
        scanLineY.value = 0; // Reset
    };

    const animatedScanLine = useAnimatedStyle(() => ({
        transform: [{ translateY: scanLineY.value }],
        opacity: scanOpacity.value,
    }));

    // 📸 Pick Image Logic
    const pickImage = async (useCamera: boolean) => {
        try {
            let result;
            if (useCamera) {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Camera access is needed to scan crops.');
                    return;
                }
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 0.8,
                });
            } else {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Gallery access is needed to load images.');
                    return;
                }
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 0.8,
                });
            }

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setResult(null); // Clear previous result
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to capture image.');
        }
    };

    const handleAnalyze = () => {
        setAnalyzing(true);
        startScanAnimation();

        // Simulate AI Processing
        setTimeout(() => {
            setAnalyzing(false);
            stopScanAnimation();
            const randomRes = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
            setResult(randomRes);
        }, 3000);
    };

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
                    <Text style={styles.headerTitle}>Crop AI Scanner</Text>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                    {/* 📷 SCANNER VIEWFINDER */}
                    <View style={styles.scannerWrapper}>
                        <View style={styles.scannerCard}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.previewImage} />
                            ) : (
                                <View style={styles.placeholderContainer}>
                                    <View style={styles.dashedBox}>
                                        <MaterialCommunityIcons name="line-scan" size={64} color="#10B981" />
                                        <Text style={styles.placeholderText}>Place Crop in Frame</Text>
                                    </View>
                                </View>
                            )}

                            {/* 🟢 Scanning Overlay */}
                            <Animated.View style={[styles.scanLine, animatedScanLine]} />
                            {analyzing && (
                                <BlurView intensity={20} style={StyleSheet.absoluteFill}>
                                    <View style={styles.analyzingOverlay}>
                                        <Text style={styles.processingText}>Processing...</Text>
                                    </View>
                                </BlurView>
                            )}
                        </View>

                        {/* 🕹️ Controls */}
                        <View style={styles.controlsRow}>
                            <Pressable style={styles.controlBtn} onPress={() => pickImage(false)}>
                                <Ionicons name="images" size={24} color="#1E7F5C" />
                            </Pressable>

                            <Pressable style={styles.captureBtn} onPress={() => pickImage(true)}>
                                <View style={styles.captureInner} />
                            </Pressable>

                            <Pressable style={styles.controlBtn} onPress={() => setImage(null)}>
                                <Ionicons name="refresh" size={24} color="#1E7F5C" />
                            </Pressable>
                        </View>
                    </View>

                    {/* 👇 ACTION / RESULT AREA */}
                    <View style={styles.contentArea}>
                        {!result && image && !analyzing && (
                            <Animated.View entering={FadeIn.duration(400)}>
                                <Pressable style={styles.analyzeBtn} onPress={handleAnalyze}>
                                    <LinearGradient
                                        colors={['#10B981', '#059669']}
                                        style={styles.gradientBtn}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text style={styles.analyzeBtnText}>Start Analysis</Text>
                                        <MaterialCommunityIcons name="google-analytics" size={24} color="#FFF" />
                                    </LinearGradient>
                                </Pressable>
                            </Animated.View>
                        )}

                        {result && (
                            <Animated.View entering={SlideInUp.springify().damping(15)} style={styles.resultContainer}>
                                <BlurView intensity={80} tint="light" style={styles.resultCard}>
                                    {/* Header */}
                                    <View style={[styles.resultHeader, { borderLeftColor: result.color }]}>
                                        <View>
                                            <Text style={styles.detectedLabel}>Detected Issue</Text>
                                            <Text style={[styles.issueTitle, { color: result.color }]}>{result.name}</Text>
                                        </View>
                                        <View style={[styles.confidenceBadge, { backgroundColor: result.color + '20' }]}>
                                            <Text style={[styles.confidenceVal, { color: result.color }]}>{result.confidence}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.divider} />

                                    {/* Stats Grid */}
                                    <View style={styles.statsGrid}>
                                        <View style={styles.statBox}>
                                            <Text style={styles.statLabel}>Severity</Text>
                                            <Text style={[styles.statValue, { color: result.severity === 'Critical' ? '#EF4444' : '#374151' }]}>
                                                {result.severity}
                                            </Text>
                                        </View>
                                        <View style={styles.statBox}>
                                            <Text style={styles.statLabel}>Status</Text>
                                            <Text style={styles.statValue}>Action Needed</Text>
                                        </View>
                                    </View>

                                    {/* Recommendation */}
                                    <View style={styles.recBox}>
                                        <View style={styles.recHeader}>
                                            <Ionicons name="medkit" size={18} color="#1E7F5C" />
                                            <Text style={styles.recTitle}>AI Treatment Plan</Text>
                                        </View>
                                        <Text style={styles.recText}>{result.treatment}</Text>
                                    </View>

                                    <Pressable style={styles.saveReportBtn} onPress={() => router.back()}>
                                        <Text style={styles.saveReportText}>Save to History</Text>
                                    </Pressable>
                                </BlurView>
                            </Animated.View>
                        )}
                    </View>

                </ScrollView>
            </View>
        </AgriTechBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10,
    },
    backBtn: { borderRadius: 12, overflow: 'hidden' },
    blurBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#0F2A1D' },

    scroll: { paddingBottom: 120 },

    scannerWrapper: { alignItems: 'center', marginTop: 20 },
    scannerCard: {
        width: width - 40,
        height: width - 40,
        backgroundColor: '#FFF',
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#FFF',
        shadowColor: '#10B981',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
        position: 'relative',
    },
    previewImage: { width: '100%', height: '100%' },
    placeholderContainer: { flex: 1, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center' },
    dashedBox: {
        width: '80%', height: '80%', borderWidth: 2, borderColor: '#86EFAC', borderStyle: 'dashed', borderRadius: 24,
        alignItems: 'center', justifyContent: 'center',
    },
    placeholderText: { color: '#059669', fontWeight: '700', marginTop: 16 },

    scanLine: {
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        backgroundColor: '#10B981',
        shadowColor: '#10B981', shadowOpacity: 1, shadowRadius: 10,
    },
    analyzingOverlay: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.4)'
    },
    processingText: { fontSize: 18, fontWeight: '800', color: '#065F46', letterSpacing: 1 },

    controlsRow: {
        flexDirection: 'row', alignItems: 'center', gap: 32, marginTop: 24,
    },
    controlBtn: {
        width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
    },
    captureBtn: {
        width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1, borderColor: '#E5E7EB',
        shadowColor: '#10B981', shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
    },
    captureInner: {
        width: 64, height: 64, borderRadius: 32, backgroundColor: '#10B981',
        borderWidth: 4, borderColor: '#D1FAE5',
    },

    contentArea: { padding: 20 },
    analyzeBtn: { borderRadius: 24, overflow: 'hidden', marginTop: 10 },
    gradientBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
    analyzeBtnText: { color: '#FFF', fontSize: 18, fontWeight: '800' },

    resultContainer: { marginTop: 10 },
    resultCard: {
        borderRadius: 28, padding: 24, overflow: 'hidden',
        borderWidth: 1, borderColor: '#fff'
    },
    resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderLeftWidth: 4, paddingLeft: 12 },
    detectedLabel: { fontSize: 12, fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' },
    issueTitle: { fontSize: 22, fontWeight: '800', marginTop: 4 },
    confidenceBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    confidenceVal: { fontWeight: '800', fontSize: 14 },

    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 20 },

    statsGrid: { flexDirection: 'row', gap: 24, marginBottom: 20 },
    statBox: { flex: 1 },
    statLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
    statValue: { fontSize: 16, fontWeight: '700', color: '#1F2937' },

    recBox: { backgroundColor: 'rgba(255,255,255,0.6)', padding: 16, borderRadius: 20 },
    recHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
    recTitle: { fontSize: 14, fontWeight: '700', color: '#10B981' },
    recText: { fontSize: 14, color: '#4B5563', lineHeight: 22 },

    saveReportBtn: { marginTop: 24, backgroundColor: '#0F2A1D', paddingVertical: 16, borderRadius: 18, alignItems: 'center' },
    saveReportText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
