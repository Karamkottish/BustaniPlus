import { View, Text, StyleSheet } from 'react-native';

export default function Schedule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Festival Schedule</Text>

      <Text>10:00 — Farm Tour</Text>
      <Text>12:00 — Citrus Picking</Text>
      <Text>14:00 — Kids Workshop</Text>
      <Text>17:00 — Sunset Event</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 16 },
});
