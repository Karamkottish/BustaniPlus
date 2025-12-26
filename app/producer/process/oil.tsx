import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OilProcessScreen() {
  return (
    <ScrollView style={styles.screen}>
      <LinearGradient colors={['#78350F', '#F59E0B']} style={styles.header}>
        <Text style={styles.title}>Citrus Oil Extraction</Text>
        <Text style={styles.subtitle}>
          High-value by-product utilization
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.text}>
          Citrus peels are processed into essential oils used in cosmetics,
          cleaning products, and food flavoring.
        </Text>

        <Text style={styles.profit}>+6.8 SAR / kg (Peel)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFBEB' },
  header: {
    paddingTop: 64,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { marginTop: 6, color: '#FEF3C7' },
  card: {
    margin: 22,
    padding: 22,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    elevation: 10,
  },
  text: { fontSize: 14, color: '#374151', lineHeight: 20 },
  profit: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '900',
    color: '#78350F',
  },
});
