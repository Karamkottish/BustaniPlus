import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

export default function FarmDetail() {
  const { id } = useLocalSearchParams();

  return (
    <LinearGradient colors={['#EAF6F3', '#FFFFFF']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🌾 HERO */}
        <View style={styles.hero}>
          <LinearGradient
            colors={['#BEE7E8', '#EAF6F3']}
            style={styles.heroBg}
          />
          <Text style={styles.heroEmoji}>🌾</Text>
          <Text style={styles.title}>Farm Experience</Text>
          <Text style={styles.subtitle}>Farm ID • {id}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>🌿 Organic • Family Friendly</Text>
          </View>
        </View>

        {/* 📖 ABOUT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🌱 About this Farm</Text>
          <Text style={styles.text}>
            Enjoy an authentic farm experience with guided tours, hands-on
            workshops, and seasonal activities designed for families, kids,
            and nature lovers.
          </Text>
        </View>

        {/* 🧺 ACTIVITIES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧺 Activities</Text>
          <Text style={styles.listItem}>🍊 Fruit picking</Text>
          <Text style={styles.listItem}>👩‍🌾 Guided farm tour</Text>
          <Text style={styles.listItem}>🧒 Kids learning zone</Text>
          <Text style={styles.listItem}>🧑‍🍳 Local workshops</Text>
        </View>

        {/* 📸 GALLERY */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📸 Gallery</Text>

          <View style={styles.galleryRow}>
            <View style={styles.imagePlaceholder}>
              <Text>🌄</Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text>🌳</Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text>🍊</Text>
            </View>
          </View>
        </View>

        {/* 🎯 ACTIONS */}
        <View style={styles.actions}>
          <Pressable style={styles.primary}>
            <Text style={styles.primaryText}>📅 Book Visit</Text>
          </Pressable>

          <Pressable style={styles.secondary}>
            <Text style={styles.secondaryText}>🧭 Navigate to Farm</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* 🌾 HERO */
  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    marginBottom: 10,
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
  },
  heroEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E7F5C',
  },
  subtitle: {
    marginTop: 4,
    color: '#4B7F73',
  },
  badge: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E7F5C',
  },

  /* 📖 CARDS */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1E7F5C',
  },
  text: {
    color: '#4B7F73',
    lineHeight: 22,
  },
  listItem: {
    marginBottom: 6,
    color: '#374151',
  },

  /* 📸 GALLERY */
  galleryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  imagePlaceholder: {
    flex: 1,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#EAF6F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* 🎯 ACTIONS */
  actions: {
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  primary: {
    backgroundColor: '#1E7F5C',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  secondary: {
    backgroundColor: '#EAF6F3',
    padding: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#1E7F5C',
    fontWeight: '600',
  },
});
