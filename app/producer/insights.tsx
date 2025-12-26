import { ScrollView, Text, StyleSheet } from 'react-native';
import AiInsights from '@/components/AiInsights';
import RevenueChart from '@/components/RevenueChart';

export default function Insights() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Insights</Text>
      <AiInsights />
      <RevenueChart />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6FAF8',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
});
