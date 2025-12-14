import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Passport() {
  const [stamps, setStamps] = useState(3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 Citrus Passport</Text>
      <Text style={styles.progress}>{stamps} / 10 Stamps Collected</Text>

      <Pressable
        style={styles.button}
        onPress={() => setStamps((s) => Math.min(s + 1, 10))}
      >
        <Text style={styles.buttonText}>Scan QR → Add Stamp</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: '800' },
  progress: { marginVertical: 16 },
  button: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
