import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ReactQueryProvider } from '@/lib/react-query-provider';
import "../global.css"

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ReactQueryProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard/[userId]" options={{ headerShown: true }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          
          <Stack.Screen name="dashboard/[userId]/plugs" options={{ headerShown: true }} />
          <Stack.Screen name="dashboard/[userId]/power_usage" options={{ headerShown: true }} />
          <Stack.Screen name="dashboard/[userId]/rewards" options={{ headerShown: true }} />
          <Stack.Screen name="dashboard/[userId]/friends" options={{ headerShown: true }} />
          <Stack.Screen name="dashboard/[userId]/settings" options={{ headerShown: true }} />
        </Stack>
      </ReactQueryProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
