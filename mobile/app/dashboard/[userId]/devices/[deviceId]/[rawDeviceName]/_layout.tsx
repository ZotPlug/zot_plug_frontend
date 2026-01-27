import { Stack } from 'expo-router';

export default function PlugUsageLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

