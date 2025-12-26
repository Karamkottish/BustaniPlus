import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function JuiceProcessScreen() {
  return (
    <ScrollView style={styles.screen}>
      <LinearGradient colors={['#166534', '#22C55E']} style={styles.header}>
        <Text style={styles.title}>Juice Processing</Text>
        <Text style={styles.subtitle}>
          From harvest to bottled value
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        <StoryStep
          icon="leaf-outline"
          title="Harvest"
          text="Fresh citrus is harvested at optimal ripeness to ensure maximum juice quality."
        />
        <StoryStep
          icon="water-outline"
          title="Extraction"
          text="Cold-press extraction preserves nutrients and natural flavor."
        />
        <StoryStep
          icon="flask-outline"
          title="Pasteurization"
          text="Light heat treatment ensures safety without affecting taste."
        />
        <StoryStep
          icon="cube-outline"
          title="Packaging"
          text="Eco-friendly bottles prepared for local and export markets."
        />
      </View>

      {/* PROFIT CARD */}
      <View style={styles.profitCard}>
        <Text style={styles.profitTitle}>Estimated Profit</Text>
        <Text style={styles.profitValue}>+3.4 SAR / kg</Text>
        <Text style={styles.profitMeta}>
          Based on current market demand
        </Text>
      </View>

      <Pressable style={styles.actionButton}>
        <Ionicons name="play" size={20} color="#fff" />
        <Text style={styles.actionText}>Start Juice Process</Text>
      </Pressable>
    </ScrollView>
  );
}

function StoryStep({
  icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.step}>
      <Ionicons name={icon} size={22} color="#16A34A" />
      <View style={{ flex: 1 }}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0FDF4' },

  header: {
    paddingTop: 64,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  title: { color: '#fff', fontSize: 26, fontWeight: '800' },
  subtitle: { marginTop: 6, color: '#DCFCE7', fontSize: 14 },

  section: { padding: 22 },

  step: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    elevation: 6,
  },

  stepTitle: { fontSize: 15, fontWeight: '800', color: '#14532D' },
  stepText: { fontSize: 13, color: '#374151', marginTop: 4 },

  profitCard: {
    marginHorizontal: 22,
    marginTop: 10,
    padding: 20,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
  },

  profitTitle: { fontSize: 14, fontWeight: '700', color: '#166534' },
  profitValue: { fontSize: 22, fontWeight: '900', color: '#14532D', marginTop: 6 },
  profitMeta: { fontSize: 12, color: '#166534', marginTop: 4 },

  actionButton: {
    margin: 22,
    height: 54,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 10,
  },

  actionText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
