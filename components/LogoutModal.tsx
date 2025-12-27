import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Props {
    visible: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export default function LogoutModal({ visible, onClose, onLogout }: Props) {
    if (!visible) return null;

    return (
        <Animated.View
            style={styles.overlay}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
        >
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />

            {/* Tap outside to close */}
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

            <Animated.View
                style={styles.card}
                entering={ZoomIn.duration(300).springify()}
                exiting={ZoomOut.duration(200)}
            >
                <View style={styles.iconWrapper}>
                    <Ionicons name="log-out" size={32} color="#EF4444" />
                </View>

                <Text style={styles.title}>Log Out?</Text>
                <Text style={styles.subtitle}>Are you sure you want to return to role selection?</Text>

                <View style={styles.buttonRow}>
                    <Pressable style={[styles.btn, styles.btnCancel]} onPress={onClose}>
                        <Text style={styles.btnCancelText}>Cancel</Text>
                    </Pressable>

                    <Pressable style={[styles.btn, styles.btnLogout]} onPress={onLogout}>
                        <Text style={styles.btnLogoutText}>Log Out</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.3)', // Fallback if blur fails or adds too much tint
    },
    card: {
        width: width * 0.82,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderRadius: 32,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
    },
    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: '#FEF2F2',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    btn: {
        flex: 1,
        height: 52,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCancel: {
        backgroundColor: '#F3F4F6',
    },
    btnCancelText: {
        color: '#4B5563',
        fontWeight: '700',
        fontSize: 16,
    },
    btnLogout: {
        backgroundColor: '#EF4444',
    },
    btnLogoutText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
});
