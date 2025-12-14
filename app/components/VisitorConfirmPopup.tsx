import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function VisitorConfirmPopup({ visible, onClose }: Props) {
  const router = useRouter();

  if (!visible) return null;

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      {/* Stop propagation so tapping card does NOT close */}
      <View
        style={styles.card}
        onStartShouldSetResponder={() => true}
      >
        <Text style={styles.title}>🎉 Ready for the fun to begin?</Text>

        <Text style={styles.subtitle}>
          Explore farms, activities, games, and unforgettable agritourism
          experiences.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => {
            onClose();
router.push('/visitor');
          }}
        >
          <Text style={styles.buttonText}>Yes, let’s go 🌿</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2A1D',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 22,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 16,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
