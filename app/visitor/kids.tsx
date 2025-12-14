import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function KidsGame() {
  const [level, setLevel] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Kids Learning Game</Text>
      <Text>Current Level: {level}</Text>

      <Pressable
        style={styles.button}
        onPress={() => setLevel(level + 1)}
      >
        <Text style={styles.buttonText}>Complete Level</Text>
      </Pressable>

      {level >= 3 && <Text>🏆 Reward Unlocked!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: '800' },
  button: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
