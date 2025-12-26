import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ProductActionPopup from '@/components/ProductActionPopup';

/* -------------------------------------------------------------------------- */
/*                                MOCK PRODUCTS                               */
/* -------------------------------------------------------------------------- */

const PRODUCTS = [
  {
    id: '1',
    name: 'Brocullai ',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5',
    stock: 120,
    unit: 'kg',
    usages: [
      { type: 'Fresh Market', percent: 45 },
      { type: 'Juice Production', percent: 35 },
      { type: 'Dry Peel', percent: 20 },
    ],
  },
  {
    id: '2',
    name: 'Blue Berry',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc',
    stock: 240,
    unit: 'kg',
    usages: [
      { type: 'Fresh Market', percent: 50 },
      { type: 'Juice Factory', percent: 40 },
      { type: 'Export', percent: 10 },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   SCREEN                                   */
/* -------------------------------------------------------------------------- */

export default function ProductsScreen() {
  const [popupVisible, setPopupVisible] = useState(false);

  // ✅ ADD "process"
  const [popupAction, setPopupAction] =
    useState<'manage' | 'sell' | 'process' | null>(null);

  const [selectedProduct, setSelectedProduct] = useState('');

  const openPopup = (productName: string, action: 'manage' | 'sell' | 'process') => {
    setSelectedProduct(productName);
    setPopupAction(action);
    setPopupVisible(true);
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#0B3D2E', '#1E7F5C']} style={styles.header}>
        <Text style={styles.title}>My Products</Text>
        <Text style={styles.subtitle}>
          What you grow • How you use it • Where it goes
        </Text>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {PRODUCTS.map((product, index) => (
          <Animated.View
            key={product.id}
            entering={FadeInDown.delay(index * 120)}
            style={styles.card}
          >
            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={styles.body}>
              <View style={styles.rowBetween}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.stock}>
                  {product.stock} {product.unit}
                </Text>
              </View>

              <Text style={styles.usageTitle}>Current Usage</Text>

              {product.usages.map((u, i) => (
                <View key={i} style={styles.usageRow}>
                  <Text style={styles.usageType}>{u.type}</Text>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { width: `${u.percent}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.percent}>{u.percent}%</Text>
                </View>
              ))}

              {/* ACTIONS */}
              <View style={styles.actions}>
                {/* 1️⃣ MANAGE */}
                <Pressable onPress={() => openPopup(product.name, 'manage')}>
                  <Action icon="settings-outline" label="Manage" />
                </Pressable>

                {/* 2️⃣ PROCESS → STORY POPUP ✅ */}
                <Pressable onPress={() => openPopup(product.name, 'process')}>
                  <Action icon="flask-outline" label="Process" />
                </Pressable>

                {/* 3️⃣ SELL */}
                <Pressable onPress={() => openPopup(product.name, 'sell')}>
                  <Action icon="cart-outline" label="Sell" />
                </Pressable>
              </View>
            </View>
          </Animated.View>
        ))}

        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={22} color="#fff" />
          <Text style={styles.addText}>Add New Crop</Text>
        </Pressable>
      </ScrollView>

      {/* STORYTELLING POPUP */}
      <ProductActionPopup
        visible={popupVisible}
        productName={selectedProduct}
        action={popupAction}
        onClose={() => {
          setPopupVisible(false);
          setPopupAction(null);
        }}
      />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SMALL COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function Action({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={styles.action}>
      <Ionicons name={icon} size={18} color="#1E7F5C" />
      <Text style={styles.actionText}>{label}</Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4FBF8' },

  header: {
    paddingTop: 64,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  title: { color: '#fff', fontSize: 26, fontWeight: '800' },
  subtitle: { marginTop: 6, color: '#DFF5EB', fontSize: 14 },

  content: { paddingHorizontal: 22, paddingBottom: 140 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    marginTop: 24,
    overflow: 'hidden',
    elevation: 12,
  },

  image: { height: 160, width: '100%' },

  body: { padding: 16 },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productName: { fontSize: 18, fontWeight: '800', color: '#0F2A1D' },
  stock: { fontSize: 13, fontWeight: '700', color: '#1E7F5C' },

  usageTitle: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },

  usageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  usageType: { width: 110, fontSize: 12, color: '#374151' },

  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    marginHorizontal: 8,
  },

  barFill: {
    height: 8,
    backgroundColor: '#1E7F5C',
    borderRadius: 999,
  },

  percent: {
    width: 36,
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'right',
  },

  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  action: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E7F5C',
  },

  addButton: {
    marginTop: 36,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E7F5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 12,
  },

  addText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
