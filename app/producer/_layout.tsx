import { Tabs } from 'expo-router';
import ProducerTabBar from '@/components/ProducerTabBar';

export default function ProducerLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <ProducerTabBar {...props} />}
    >
      {/* MUST MATCH FILENAMES */}
      <Tabs.Screen name="home" />
      <Tabs.Screen name="products" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="insights" />
    </Tabs>
  );
}
