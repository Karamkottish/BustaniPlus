import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ARTour() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 AR Farm Tour</Text>

      <Text style={styles.text}>
        Walk through farms using Augmented Reality and learn how citrus grows.
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Start AR Experience</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '800' },
  text: { marginVertical: 16 },
  button: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
