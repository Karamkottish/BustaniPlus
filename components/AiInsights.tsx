import { View, Text, StyleSheet } from 'react-native';

export default function AiInsights() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🇸🇦 AI Farm Insights</Text>
      <Text style={styles.text}>
        Ideal conditions today for citrus irrigation. 
        Consider light watering before sunset to reduce evaporation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ECFDF5',
    borderRadius: 22,
    padding: 18,
    marginTop: 24,
  },
  title: {
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 6,
  },
  text: {
    color: '#047857',
    fontSize: 13,
    lineHeight: 18,
  },
});
