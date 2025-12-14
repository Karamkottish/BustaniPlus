import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';

type Mission = 1 | 2 | 3 | 4;

export default function KidsGame() {
  const [mission, setMission] = useState<Mission>(1);
  const [score, setScore] = useState(0);

  const grow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(grow, {
      toValue: mission,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [mission]);

  const plantScale = grow.interpolate({
    inputRange: [1, 4],
    outputRange: [0.6, 1.3],
  });

  const nextMission = () => {
    if (mission < 4) {
      setMission((mission + 1) as Mission);
    }
  };

  return (
    <LinearGradient colors={['#87CEEB', '#EAF6F3']} style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>🎮 Farm Learning Game</Text>
      <Text style={styles.subtitle}>
        Complete mini-games to grow your farm
      </Text>

      {/* FARM VISUAL */}
      <View style={styles.farm}>
        <Animated.Text
          style={[
            styles.plant,
            { transform: [{ scale: plantScale }] },
          ]}
        >
          {mission < 4 ? '🌱' : '🌳'}
        </Animated.Text>
        <View style={styles.soil} />
      </View>

      {/* PROGRESS */}
      <Text style={styles.progress}>
        Mission {mission} / 4
      </Text>

      {/* MINI GAMES */}
      <View style={styles.gameBox}>
        {mission === 1 && (
          <SeedGame onComplete={nextMission} />
        )}

        {mission === 2 && (
          <WaterGame onComplete={nextMission} />
        )}

        {mission === 3 && (
          <SunGame onComplete={nextMission} />
        )}

        {mission === 4 && (
          <HarvestGame score={score} setScore={setScore} />
        )}
      </View>

      {/* REWARD */}
      {mission === 4 && score >= 3 && (
        <View style={styles.reward}>
          <Text style={styles.rewardTitle}>
            🏆 Farm Hero!
          </Text>
          <Text style={styles.rewardText}>
            You unlocked a Kids Festival Badge 🎟
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}

/* =========================
   MINI GAMES
========================= */

// 🌱 1. SEED GAME — Tap to plant
function SeedGame({ onComplete }: { onComplete: () => void }) {
  return (
    <>
      <Text style={styles.gameTitle}>🌱 Plant the Seed</Text>
      <Text style={styles.gameText}>
        Tap the soil to plant a seed
      </Text>

      <Pressable style={styles.bigButton} onPress={onComplete}>
        <Text style={styles.bigEmoji}>🌰</Text>
      </Pressable>
    </>
  );
}

// 💧 2. WATER GAME — Tap 3 times
function WaterGame({ onComplete }: { onComplete: () => void }) {
  const [water, setWater] = useState(0);

  return (
    <>
      <Text style={styles.gameTitle}>💧 Water the Plant</Text>
      <Text style={styles.gameText}>
        Tap water drops ({water}/3)
      </Text>

      <View style={styles.row}>
        {[0, 1, 2].map((i) => (
          <Pressable
            key={i}
            style={styles.waterDrop}
            onPress={() => {
              const next = water + 1;
              setWater(next);
              if (next >= 3) onComplete();
            }}
          >
            <Text style={styles.bigEmoji}>💧</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

// ☀️ 3. SUN GAME — Match sun icons
function SunGame({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <Text style={styles.gameTitle}>☀️ Give Sunlight</Text>
      <Text style={styles.gameText}>
        Tap all the suns ({count}/3)
      </Text>

      <View style={styles.row}>
        {[0, 1, 2].map((i) => (
          <Pressable
            key={i}
            style={styles.sunIcon}
            onPress={() => {
              const next = count + 1;
              setCount(next);
              if (next >= 3) onComplete();
            }}
          >
            <Text style={styles.bigEmoji}>☀️</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

// 🍊 4. HARVEST GAME — Collect fruits
function HarvestGame({
  score,
  setScore,
}: {
  score: number;
  setScore: (n: number) => void;
}) {
  return (
    <>
      <Text style={styles.gameTitle}>🍊 Harvest Time</Text>
      <Text style={styles.gameText}>
        Collect oranges ({score}/3)
      </Text>

      <View style={styles.row}>
        {[0, 1, 2].map((i) => (
          <Pressable
            key={i}
            style={styles.orange}
            onPress={() => setScore(score + 1)}
          >
            <Text style={styles.bigEmoji}>🍊</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E7F5C',
    marginTop: 40,
  },
  subtitle: {
    marginTop: 6,
    color: '#4B7F73',
    textAlign: 'center',
  },

  farm: {
    marginTop: 30,
    alignItems: 'center',
  },
  plant: {
    fontSize: 70,
  },
  soil: {
    width: 180,
    height: 22,
    backgroundColor: '#6B3E26',
    borderRadius: 12,
    marginTop: -6,
  },

  progress: {
    marginTop: 16,
    fontWeight: '700',
    color: '#1E7F5C',
  },

  gameBox: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },

  gameTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  gameText: {
    color: '#374151',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    gap: 16,
  },

  bigButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAF6F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  waterDrop: {
    padding: 12,
  },
  sunIcon: {
    padding: 12,
  },
  orange: {
    padding: 12,
  },

  bigEmoji: {
    fontSize: 48,
  },

  reward: {
    marginTop: 20,
    backgroundColor: '#FFF7ED',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  rewardTitle: {
    fontWeight: '800',
    color: '#92400E',
  },
  rewardText: {
    marginTop: 4,
    color: '#92400E',
  },
});
