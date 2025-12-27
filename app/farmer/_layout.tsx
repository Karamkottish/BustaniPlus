import { Tabs } from 'expo-router';
import FarmerTabBar from '@/components/FarmerTabBar';

export default function FarmerLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <FarmerTabBar />}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="tree-batches" />
            <Tabs.Screen name="store" />
            <Tabs.Screen name="add-farm" options={{ href: null }} />
            <Tabs.Screen name="disease-detect" options={{ href: null }} />
            <Tabs.Screen name="irrigation" options={{ href: null }} />
        </Tabs>
    );
}
