import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutDown,
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withTiming,
    withRepeat,
    interpolateColor,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '../../store/authStore';
import { API_BASE_URL } from '../../config/api';

const { height, width } = Dimensions.get('window');

interface RegisterModalProps {
    visible: boolean;
    onClose: () => void;
}

type Role = 'visitor' | 'farmer' | 'producer';

export default function RegisterModal({ visible, onClose }: RegisterModalProps) {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('visitor');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    // Shake animation setup
    const translateX = useSharedValue(0);
    const shake = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        translateX.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(10, { duration: 50 }), 5, true),
            withTiming(0, { duration: 50 })
        );
    };

    const formAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    if (!visible) return null;

    const handleRegister = async () => {
        // Reset errors
        setErrors({});
        setErrorMsg(null);

        const newErrors: { [key: string]: boolean } = {};
        if (!fullName) newErrors.fullName = true;
        if (!email) newErrors.email = true;
        if (!password) newErrors.password = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setErrorMsg('Please ensure all fields are filled correctly.');
            shake();
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ email: true });
            setErrorMsg('Please enter a valid email address.');
            shake();
            return;
        }

        if (password.length < 8) {
            setErrors({ password: true });
            setErrorMsg('Password must be at least 8 characters.');
            shake();
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
                full_name: fullName,
                email: email,
                password: password,
                role: role,
            });

            if (response.status === 201 || response.status === 200) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                const { user, token } = response.data;
                setAuth(user, token);

                onClose();
                if (role === 'visitor') router.replace('/(tabs)');
                else if (role === 'producer') router.replace('/producer');
                else if (role === 'farmer') router.replace('/farmer');
            }
        } catch (error: any) {
            shake();
            const status = error.response?.status;
            const detail = error.response?.data?.detail;

            if (status === 409) {
                setErrors({ email: true });
                setErrorMsg('This email is already registered.');
            } else if (status === 422) {
                setErrorMsg('Invalid registration data provided.');
            } else {
                setErrorMsg(detail || 'Connection error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={StyleSheet.absoluteFill}
        >
            <Pressable style={styles.backdrop} onPress={onClose} />

            <Animated.View
                entering={SlideInDown.springify().damping(20)}
                exiting={SlideOutDown}
                style={styles.modalContainer}
            >
                <BlurView intensity={80} tint="light" style={styles.blurContainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.content}
                    >
                        <View style={styles.header}>
                            <View style={styles.handle} />
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Join the future of farming in 2027</Text>
                        </View>

                        <Animated.View style={[styles.form, formAnimatedStyle]}>
                            {errorMsg && (
                                <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.errorBanner}>
                                    <Ionicons name="alert-circle" size={18} color="#EF4444" />
                                    <Text style={styles.errorBannerText}>{errorMsg}</Text>
                                </Animated.View>
                            )}

                            <View style={[styles.inputWrapper, errors.fullName && styles.inputError]}>
                                <Ionicons name="person-outline" size={20} color={errors.fullName ? "#EF4444" : "#6B7280"} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Full Name"
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.input}
                                    value={fullName}
                                    onChangeText={(t) => {
                                        setFullName(t);
                                        if (errors.fullName) setErrors(prev => ({ ...prev, fullName: false }));
                                    }}
                                />
                            </View>

                            <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                <Ionicons name="mail-outline" size={20} color={errors.email ? "#EF4444" : "#6B7280"} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Email Address"
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.input}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={(t) => {
                                        setEmail(t);
                                        if (errors.email) setErrors(prev => ({ ...prev, email: false }));
                                    }}
                                />
                            </View>

                            <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                <Ionicons name="lock-closed-outline" size={20} color={errors.password ? "#EF4444" : "#6B7280"} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.input}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={(t) => {
                                        setPassword(t);
                                        if (errors.password) setErrors(prev => ({ ...prev, password: false }));
                                    }}
                                />
                            </View>

                            <Text style={styles.roleLabel}>Select Your Role</Text>
                            <View style={styles.roleContainer}>
                                {(['visitor', 'farmer', 'producer'] as Role[]).map((r) => (
                                    <Pressable
                                        key={r}
                                        onPress={() => setRole(r)}
                                        style={[
                                            styles.roleButton,
                                            role === r && styles.roleButtonActive
                                        ]}
                                    >
                                        <Text style={[
                                            styles.roleButtonText,
                                            role === r && styles.roleButtonTextActive
                                        ]}>
                                            {r.charAt(0).toUpperCase() + r.slice(1)}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>

                            <Pressable
                                onPress={handleRegister}
                                disabled={loading}
                                style={({ pressed }) => [
                                    styles.submitButton,
                                    pressed && { opacity: 0.8 }
                                ]}
                            >
                                <LinearGradient
                                    colors={['#1E7F5C', '#10B981']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradient}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#FFF" />
                                    ) : (
                                        <Text style={styles.submitText}>Get Started</Text>
                                    )}
                                </LinearGradient>
                            </Pressable>
                        </Animated.View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <Pressable onPress={onClose}>
                                <Text style={styles.loginLink}>Login</Text>
                            </Pressable>
                        </View>
                    </KeyboardAvoidingView>
                </BlurView>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height * 0.8,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: 'hidden',
    },
    blurContainer: {
        flex: 1,
        padding: 24,
    },
    content: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 2,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F2A1D',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    form: {
        gap: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(30, 127, 92, 0.1)',
        paddingHorizontal: 16,
        height: 56,
    },
    inputError: {
        borderColor: '#FECACA',
        backgroundColor: 'rgba(254, 202, 202, 0.2)',
    },
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        gap: 8,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    errorBannerText: {
        color: '#EF4444',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#0F2A1D',
    },
    roleLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
        marginTop: 8,
    },
    roleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    roleButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderWidth: 1,
        borderColor: 'rgba(30, 127, 92, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roleButtonActive: {
        backgroundColor: '#1E7F5C',
        borderColor: '#1E7F5C',
    },
    roleButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
    roleButtonTextActive: {
        color: '#FFF',
    },
    submitButton: {
        marginTop: 12,
        height: 56,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#1E7F5C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    footerText: {
        color: '#6B7280',
        fontSize: 14,
    },
    loginLink: {
        color: '#1E7F5C',
        fontWeight: '700',
        fontSize: 14,
    },
});
