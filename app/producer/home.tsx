import { View, Text, StyleSheet } from 'react-native';

export default function ProducerHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Producer Home Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
