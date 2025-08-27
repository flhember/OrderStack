import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: '', // enlève le titre
          headerTransparent: true, // enlève le texte du bouton retour
        }}
      />
    </Stack>
  );
}
