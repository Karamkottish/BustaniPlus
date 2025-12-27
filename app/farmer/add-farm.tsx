import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useState } from 'react';

export default function AddFarmScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [size, setSize] = useState('');

    return (
        <View style={styles.container}>
            {/* 🔙 HEADER */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <BlurView intensity={20} style={styles.blurBtn}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </BlurView>
                </Pressable>
                <Text style={styles.headerTitle}>Add New Farm</Text>
                <View style={{ width: 44 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll}>

                    {/* ℹ️ INTRO CARD */}
                    <LinearGradient
                        colors={['#1E7F5C', '#10B981']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.introCard}
                    >
                        <MaterialCommunityIcons name="sprout" size={48} color="#D1FAE5" />
                        <Text style={styles.introTitle}>Let’s set up your farm</Text>
                        <Text style={styles.introDesc}>
                            Enter farm details to enable AI crop monitoring and smart irrigation services.
                        </Text>
                    </LinearGradient>

                    {/* 📝 FORM */}
                    <View style={styles.formSection}>

                        {/* NAME */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Farm Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Al-Qassim Olive Grove"
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        {/* LOCATION (Mock Map Picker) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Location</Text>
                            <Pressable style={styles.locationBtn}>
                                <Ionicons name="map" size={20} color="#1E7F5C" />
                                <Text style={styles.locationText}>
                                    {location || 'Select on Map'}
                                </Text>
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </Pressable>
                        </View>

                        {/* SIZE */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Total Area (Hectares)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 50"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                                value={size}
                                onChangeText={setSize}
                            />
                        </View>

                        {/* CROP TYPE PILLS */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Primary Crop</Text>
                            <View style={styles.chipRow}>
                                {['🌴 Dates', '🍊 Citrus', '🌾 Wheat', '🫒 Olives'].map((c) => (
                                    <Pressable key={c} style={styles.chip}>
                                        <Text style={styles.chipText}>{c}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* 💾 FOOTER ACTION */}
            <View style={styles.footer}>
                <Pressable style={styles.saveBtn} onPress={() => router.back()}>
                    <LinearGradient
                        colors={['#1E7F5C', '#166534']}
                        style={styles.btnGradient}
                    >
                        <Text style={styles.saveText}>Create Farm</Text>
                        <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },

    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0F2A1D',
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
    backBtn: { borderRadius: 12, overflow: 'hidden' },
    blurBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },

    scroll: { padding: 24, paddingBottom: 120 },

    introCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        alignItems: 'center',
        shadowColor: '#1E7F5C',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    introTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', marginTop: 12 },
    introDesc: { color: '#D1FAE5', textAlign: 'center', marginTop: 6, lineHeight: 20 },

    formSection: {},
    inputGroup: { marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8 },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        padding: 16,
        fontSize: 16,
        color: '#1F2937',
    },

    locationBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        padding: 16,
        gap: 12,
    },
    locationText: { flex: 1, color: '#4B5563', fontWeight: '500' },

    chipRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    chip: {
        backgroundColor: '#ECFDF5',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#D1FAE5',
    },
    chipText: { color: '#065F46', fontWeight: '600' },

    footer: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: 24,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    saveBtn: { borderRadius: 20, overflow: 'hidden' },
    btnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 8,
    },
    saveText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
