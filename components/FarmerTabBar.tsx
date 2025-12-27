import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, withTiming } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

const TABS = [
    { name: 'index', label: 'Home', icon: 'home-variant', type: 'mci' },
    { name: 'tree-batches', label: 'Crops', icon: 'tree', type: 'mci' },
    { name: 'store', label: 'Orders', icon: 'storefront', type: 'special' }, // Central Hub
    { name: 'disease-detect', label: 'Scan', icon: 'camera-iris', type: 'mci' },
    { name: 'irrigation', label: 'Water', icon: 'water', type: 'ion' },
];

export default function FarmerTabBar() {
    const router = useRouter();
    const pathname = usePathname();

    // Active tab detection logic
    const activeTab = TABS.find(tab => {
        if (tab.name === 'index') return pathname === '/farmer' || pathname === '/farmer/';
        return pathname.includes(tab.name);
    })?.name || 'index';

    return (
        <View style={styles.container}>
            <BlurView intensity={30} tint="light" style={styles.blurContainer}>
                <View style={styles.tabRow}>
                    {TABS.map((tab) => (
                        <TabItem
                            key={tab.name}
                            tab={tab}
                            isActive={activeTab === tab.name}
                            onPress={() => router.push(`/farmer/${tab.name === 'index' ? '' : tab.name}` as any)}
                        />
                    ))}
                </View>
            </BlurView>
        </View>
    );
}

function TabItem({ tab, isActive, onPress }: any) {
    const scale = useSharedValue(1);
    const activeY = useSharedValue(0);

    useEffect(() => {
        activeY.value = withSpring(isActive ? -4 : 0, { damping: 12 });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: activeY.value }]
    }));

    const handlePress = () => {
        scale.value = withSpring(0.8, {}, () => {
            scale.value = withSpring(1);
        });
        onPress();
    };

    if (tab.type === 'special') {
        return (
            <Pressable onPress={handlePress} style={styles.specialWrapper}>
                <Animated.View style={[styles.specialBtn, animatedStyle]}>
                    <MaterialCommunityIcons name="storefront" size={28} color="#FFF" />
                </Animated.View>
            </Pressable>
        );
    }

    return (
        <Pressable onPress={handlePress} style={styles.tabBtn}>
            <Animated.View style={[styles.iconWrapper, animatedStyle]}>
                {tab.type === 'ion' ? (
                    <Ionicons name={isActive ? tab.icon : `${tab.icon}-outline` as any} size={24} color={isActive ? '#10B981' : '#9CA3AF'} />
                ) : (
                    <MaterialCommunityIcons name={tab.icon} size={24} color={isActive ? '#10B981' : '#9CA3AF'} />
                )}
                {isActive && <View style={styles.activeDot} />}
            </Animated.View>
            {isActive && <Text style={styles.label}>{tab.label}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        left: 16,
        right: 16,
        alignItems: 'center',
    },
    blurContainer: {
        width: '100%',
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.85)',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)'
    },
    tabRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 70,
        paddingHorizontal: 8,
    },
    tabBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: '#10B981',
        marginTop: 2,
    },
    activeDot: {
        position: 'absolute',
        bottom: -8,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#10B981',
    },
    specialWrapper: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    specialBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#0F2A1D',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 4,
        borderColor: '#F8FAFC',
    },
});
