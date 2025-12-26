import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';

type EventItem = {
  time: string;
  title: string;
  icon: string;
  note: string;
  isLive?: boolean;
};

const TODAY: EventItem[] = [
  { time: '10:00', title: 'Farm Tour', icon: '🚜', note: 'Guided experience' },
  {
    time: '12:00',
    title: 'Citrus Picking',
    icon: '🍊',
    note: 'Fresh harvest',
    isLive: true,
  },
  { time: '14:00', title: 'Kids Workshop', icon: '🎨', note: 'Learning & fun' },
  { time: '17:00', title: 'Sunset Event', icon: '🌅', note: 'Golden vibes' },
];

const TOMORROW: EventItem[] = [
  { time: '09:30', title: 'Morning Yoga', icon: '🧘', note: 'Nature flow' },
  { time: '11:00', title: 'Planting Session', icon: '🌱', note: 'Hands-on' },
  { time: '16:00', title: 'Family Picnic', icon: '🧺', note: 'Relax & enjoy' },
];

export default function Schedule() {
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.4,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const data = day === 'today' ? TODAY : TOMORROW;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#EAF6F3', '#FFFFFF']}
        style={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>📅 Festival Schedule</Text>
          <Text style={styles.subtitle}>Plan your perfect day at Bustani+</Text>

          {/* TOGGLE */}
          <View style={styles.toggle}>
            <Pressable
              style={[
                styles.toggleBtn,
                day === 'today' && styles.toggleActive,
              ]}
              onPress={() => setDay('today')}
            >
              <Text
                style={[
                  styles.toggleText,
                  day === 'today' && styles.toggleTextActive,
                ]}
              >
                Today
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.toggleBtn,
                day === 'tomorrow' && styles.toggleActive,
              ]}
              onPress={() => setDay('tomorrow')}
            >
              <Text
                style={[
                  styles.toggleText,
                  day === 'tomorrow' && styles.toggleTextActive,
                ]}
              >
                Tomorrow
              </Text>
            </Pressable>
          </View>
        </View>

        {/* TIMELINE */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160 }}
        >
          {data.map((item, i) => (
            <View key={i} style={styles.row}>
              {/* DOT */}
              <View style={styles.dotCol}>
                {item.isLive ? (
                  <Animated.View
                    style={[
                      styles.dotLive,
                      { transform: [{ scale: pulse }] },
                    ]}
                  />
                ) : (
                  <View style={styles.dot} />
                )}
                {i !== data.length - 1 && <View style={styles.line} />}
              </View>

              {/* CARD */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.time}>{item.time}</Text>
                  {item.isLive && (
                    <View style={styles.liveBadge}>
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.event}>
                  {item.icon} {item.title}
                </Text>
                <Text style={styles.note}>{item.note}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* STICKY CTA */}
      <View style={styles.cta}>
        <Pressable style={styles.ctaBtn}>
          <Text style={styles.ctaText}>🎟 Join Event</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* =======================
   STYLES — 2026 READY
======================= */
const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },

  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E7F5C',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#4B7F73',
  },

  toggle: {
    marginTop: 16,
    flexDirection: 'row',
    backgroundColor: '#EAF6F3',
    borderRadius: 999,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#1E7F5C',
  },
  toggleText: {
    fontWeight: '600',
    color: '#1E7F5C',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  dotCol: {
    width: 28,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C7EDE3',
  },
  dotLive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginLeft: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  time: {
    fontWeight: '700',
    color: '#1E7F5C',
  },
  liveBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  event: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B3A34',
  },
  note: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },

  cta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  ctaBtn: {
    backgroundColor: '#1E7F5C',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
