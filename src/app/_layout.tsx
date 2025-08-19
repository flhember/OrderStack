import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthProvider from '@/src/providers/AuthProvider';
import CartProvider from '@/src/providers/CartProvider';

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
        <AuthProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: true }} />
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen
                name="cart"
                options={{ presentation: 'modal', title: 'Cart' }}
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
