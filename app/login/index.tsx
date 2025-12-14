import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function LoginScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);

  const passwordRef = useRef<TextInput>(null);

  const isDisabled = !email || !password;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* HEADER */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Continue as {role === 'farmer' ? 'Farmer' : 'Producer'}
            </Text>

            {/* EMAIL */}
            <View
              style={[
                styles.inputWrapper,
                focused === 'email' && styles.inputFocused,
              ]}
            >
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={styles.input}
              />
            </View>

            {/* PASSWORD */}
            <View
              style={[
                styles.inputWrapper,
                focused === 'password' && styles.inputFocused,
              ]}
            >
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                ref={passwordRef}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                returnKeyType="done"
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                style={styles.input}
              />
            </View>

            {/* BUTTON */}
            <Pressable
              disabled={isDisabled}
              style={({ pressed }) => [
                styles.button,
                isDisabled && styles.buttonDisabled,
                pressed && !isDisabled && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>

            {/* FOOTER */}
            <Text style={styles.footerText}>
              By continuing, you agree to Bustani+ Terms & Privacy Policy
            </Text>
          </View>

          {/* EXTRA SPACE FOR KEYBOARD */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------------------------------------------------
   🎨 STYLES — 2026 PREMIUM
--------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2A1D',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F2A1D',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 24,
  },

  /* INPUTS */

  inputWrapper: {
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputFocused: {
    borderColor: '#1E7F5C',
    backgroundColor: '#F0FDF9',
  },

  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },

  input: {
    height: 36,
    fontSize: 15,
    color: '#111827',
    padding: 0,
  },

  /* BUTTON */

  button: {
    height: 52,
    borderRadius: 18,
    backgroundColor: '#1E7F5C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },

  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  /* FOOTER */

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 18,
    lineHeight: 18,
  },
});
