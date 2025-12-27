import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// 🌿 A 2026 Trendy Agri-Tech Background
// Features: Deep rich gradients, floating "bio-orbs", and subtle tech-grid hints.

export default function AgriTechBackground({ children }: { children: React.ReactNode }) {
    // Animation Values for Orbs
    const orb1Y = useSharedValue(0);
    const orb1X = useSharedValue(0);
    const orb2Y = useSharedValue(0);
    const orb2Scale = useSharedValue(1);

    // Continuous floating animation
    useEffect(() => {
        orb1Y.value = withRepeat(
            withSequence(
                withTiming(-50, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );
        orb1X.value = withRepeat(
            withSequence(
                withTiming(30, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 5000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        orb2Y.value = withRepeat(
            withSequence(
                withTiming(40, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 6000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );
        orb2Scale.value = withRepeat(
            withSequence(
                withTiming(1.2, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );
    }, []);

    const animatedOrb1 = useAnimatedStyle(() => ({
        transform: [{ translateY: orb1Y.value }, { translateX: orb1X.value }],
    }));

    const animatedOrb2 = useAnimatedStyle(() => ({
        transform: [{ translateY: orb2Y.value }, { scale: orb2Scale.value }],
    }));

    return (
        <View style={styles.container}>
            {/* 1. Base Deep Gradient */}
            <LinearGradient
                colors={['#F0FDF4', '#DCFCE7', '#F0FDF4']} // Very light fresh green base
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* 2. Floating Bio-Orbs (Abstract Shapes) */}
            <Animated.View style={[styles.orb1, animatedOrb1]}>
                <LinearGradient
                    colors={['rgba(16, 185, 129, 0.15)', 'rgba(16, 185, 129, 0)']}
                    style={styles.orbGradient}
                />
            </Animated.View>

            <Animated.View style={[styles.orb2, animatedOrb2]}>
                <LinearGradient
                    colors={['rgba(59, 130, 246, 0.12)', 'rgba(59, 130, 246, 0)']}
                    style={styles.orbGradient}
                />
            </Animated.View>

            {/* 3. Tech Grid Overlay (Subtle) */}
            <View style={styles.gridContainer} pointerEvents="none">
                <Svg height="100%" width="100%" style={{ opacity: 0.3 }}>
                    <Path
                        d={`M0 ${height * 0.2} Q ${width * 0.5} ${height * 0.1} ${width} ${height * 0.25}`}
                        stroke="#10B981"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="10, 20"
                    />
                    <Path
                        d={`M0 ${height * 0.6} Q ${width * 0.5} ${height * 0.7} ${width} ${height * 0.55}`}
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="10, 20"
                    />
                    {/* Tech Circles */}
                    <Circle cx={width * 0.8} cy={height * 0.15} r="4" fill="#10B981" opacity="0.6" />
                    <Circle cx={width * 0.2} cy={height * 0.65} r="3" fill="#3B82F6" opacity="0.6" />
                </Svg>
            </View>

            {/* 4. Content Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC', // Fallback
    },
    content: {
        flex: 1,
        zIndex: 10,
    },
    orb1: {
        position: 'absolute',
        top: -100,
        right: -50,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        opacity: 0.8,
    },
    orb2: {
        position: 'absolute',
        bottom: height * 0.2,
        left: -80,
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: width * 0.35,
        opacity: 0.8,
    },
    orbGradient: {
        flex: 1,
        borderRadius: 999,
    },
    gridContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
});
