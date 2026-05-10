import { requireOptionalNativeModule } from "expo";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { BottomSheetProvider } from "jam-bottomsheet";

const DevMenuPreferences = requireOptionalNativeModule("DevMenuPreferences");

DevMenuPreferences?.setPreferencesAsync({
  showsAtLaunch: false,
});

export default function RootLayout() {
  return (
    <BottomSheetProvider>
      <Stack>
        <Stack.Screen name="test-screen" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </BottomSheetProvider>
  );
}
