import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthProvider, { useAuth } from '@/src/providers/AuthProvider';
import CartProvider from '@/src/providers/CartProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useRef } from 'react';
import QueryProvider from '../providers/QueryProvider';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading, isAdmin } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigating = useRef(false);

  useEffect(() => {
    if (loading || navigating.current) return;

    const group = segments[0];

    if (group == 'cart') return;

    const inAuth = group === '(auth)';
    const inUser = group === '(user)';
    const inAdmin = group === '(admin)';

    if (!session && !inAuth) {
      navigating.current = true;
      router.replace('/(auth)/sign-in');
      setTimeout(() => (navigating.current = false), 0);
      return;
    }

    if (session) {
      const target = isAdmin ? '/(admin)/menu' : '/(user)/menu';
      const already = (isAdmin && inAdmin) || (!isAdmin && inUser);

      if (!already) {
        navigating.current = true;
        console.log('Redirecting to', target);
        router.replace(target);
        setTimeout(() => (navigating.current = false), 0);
      }
    }
  }, [session, loading, isAdmin, segments]);

  if (loading) return null;
  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}
        >
          <AuthProvider>
            <QueryProvider>
              <AuthGate>
                <CartProvider>
                  <Stack initialRouteName="index">
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(user)"
                      options={{ headerShown: false, animation: 'none' }}
                    />
                    <Stack.Screen
                      name="(admin)"
                      options={{ headerShown: false, animation: 'none' }}
                    />
                    <Stack.Screen
                      name="cart"
                      options={{ presentation: 'modal', title: 'Cart' }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                  <StatusBar style="auto" />
                </CartProvider>
              </AuthGate>
            </QueryProvider>
          </AuthProvider>
        </StripeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
