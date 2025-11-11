import { Stack } from 'expo-router';

export default function PowerUsageLayout() {
  // This has a bug where the Plugs header still shows up while looking at a
  // specific plug, but this addresses the nested stack header problem.

  // We should be fine to leave this header bug alone for now because we'll 
  // replace the default header routing logic with a custom back button anyway.
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[deviceName]" options={{ headerShown: false }} />
    </Stack>
  )
}

