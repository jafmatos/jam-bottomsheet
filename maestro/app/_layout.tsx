import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { BottomSheetProvider } from 'react-native-bottomsheet';

export default function RootLayout() {
  return (
    <BottomSheetProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </BottomSheetProvider>
  );
}
