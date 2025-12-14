import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function BookExperienceScreen() {
  const [selected, setSelected] = useState('Citrus');
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [time, setTime] = useState('09:00');
  const [payment, setPayment] = useState<'apple' | 'mada' | 'stc'>('apple');
  const [confirmed, setConfirmed] = useState(false);

  const PRICE_ADULT = 50;
  const PRICE_CHILD = 25;

  const people = adults + kids;
  const subtotal = adults * PRICE_ADULT + kids * PRICE_CHILD;

  const discount = people >= 4 ? 0.15 : 0;
  const total = Math.round(subtotal * (1 - discount));

  const BEST_TIME = '16:30';

  return (
    <LinearGradient colors={['#EAF6F3', '#FFFFFF']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>📅 Book Experience</Text>

        {/* 🌿 EXPERIENCE */}
        <Text style={styles.section}>Choose Experience</Text>
        <View style={styles.row}>
          {['Citrus', 'Workshop', 'Tour', 'Kids'].map((item) => (
            <Pressable
              key={item}
              onPress={() => setSelected(item)}
              style={[
                styles.card,
                selected === item && styles.cardActive,
              ]}
            >
              <Text
                style={[
                  styles.cardText,
                  selected === item && styles.cardTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 🗓 TIME */}
        <Text style={styles.section}>Available Time</Text>
        <View style={styles.row}>
          {['09:00', '11:30', '16:30'].map((t) => (
            <Pressable
              key={t}
              onPress={() => setTime(t)}
              style={[
                styles.timeChip,
                time === t && styles.timeActive,
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  time === t && styles.timeTextActive,
                ]}
              >
                {t}
                {t === BEST_TIME && ' ⭐'}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.smartHint}>
          🧠 Best time today: {BEST_TIME}
        </Text>

        {/* 👨‍👩‍👧 PEOPLE */}
        <Text style={styles.section}>Participants</Text>

        {[
          { label: '👨 Adults', value: adults, set: setAdults, min: 1 },
          { label: '🧒 Children', value: kids, set: setKids, min: 0 },
        ].map(({ label, value, set, min }) => (
          <View key={label} style={styles.counter}>
            <Text>{label}</Text>
            <View style={styles.counterRow}>
              <Pressable onPress={() => set(Math.max(min, value - 1))}>
                <Text style={styles.counterBtn}>−</Text>
              </Pressable>
              <Text>{value}</Text>
              <Pressable onPress={() => set(value + 1)}>
                <Text style={styles.counterBtn}>+</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* 💳 PAYMENT */}
        <Text style={styles.section}>Payment Method</Text>
        <View style={styles.row}>
          {[
            { key: 'apple', label: ' Apple Pay' },
            { key: 'mada', label: 'Mada' },
            { key: 'stc', label: 'STC Pay' },
          ].map((p: any) => (
            <Pressable
              key={p.key}
              onPress={() => setPayment(p.key)}
              style={[
                styles.payCard,
                payment === p.key && styles.payActive,
              ]}
            >
              <Text
                style={[
                  styles.payText,
                  payment === p.key && styles.payTextActive,
                ]}
              >
                {p.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 💰 SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.summaryRow}>
            Subtotal: {subtotal} SAR
          </Text>

          {discount > 0 && (
            <Text style={styles.discount}>
              🎉 Group Discount −15%
            </Text>
          )}

          <Text style={styles.summaryTotal}>
            Total: {total} SAR
          </Text>
        </View>

        {/* 🎟 TICKET */}
        {confirmed && (
          <View style={styles.ticket}>
            <Text style={styles.ticketTitle}>🎟 Booking Confirmed</Text>
            <Text>Experience: {selected}</Text>
            <Text>Time: {time}</Text>
            <Text>QR Ticket: █ █ █ █</Text>
          </View>
        )}
      </ScrollView>

      {/* ✅ CTA */}
      <Pressable
        style={styles.primary}
        onPress={() => setConfirmed(true)}
      >
        <Text style={styles.primaryText}>
          Confirm & Pay {total} SAR
        </Text>
      </Pressable>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E7F5C',
    marginBottom: 16,
  },

  section: {
    fontWeight: '700',
    marginVertical: 12,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#EAF6F3',
  },

  cardActive: {
    backgroundColor: '#1E7F5C',
  },

  cardText: {
    color: '#1E7F5C',
    fontWeight: '600',
  },

  cardTextActive: {
    color: '#FFFFFF',
  },

  timeChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#EAF6F3',
  },

  timeActive: {
    backgroundColor: '#1E7F5C',
  },

  timeText: {
    color: '#1E7F5C',
    fontWeight: '600',
  },

  timeTextActive: {
    color: '#FFFFFF',
  },

  smartHint: {
    marginTop: 6,
    color: '#6B7280',
    fontSize: 12,
  },

  counter: { marginBottom: 12 },

  counterRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },

  counterBtn: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E7F5C',
  },

  payCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#EAF6F3',
  },

  payActive: {
    backgroundColor: '#1E7F5C',
  },

  payText: {
    fontWeight: '600',
    color: '#1E7F5C',
  },

  payTextActive: {
    color: '#FFFFFF',
  },

  summary: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
  },

  summaryRow: {
    color: '#374151',
  },

  discount: {
    marginTop: 6,
    color: '#059669',
    fontWeight: '700',
  },

  summaryTotal: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '800',
  },

  ticket: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#EAF6F3',
    borderRadius: 16,
  },

  ticketTitle: {
    fontWeight: '800',
    marginBottom: 6,
  },

  primary: {
    height: 58,
    backgroundColor: '#1E7F5C',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
