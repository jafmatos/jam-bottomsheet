import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Text>Home screen</Text>

      <Button title="Go to TestScreen" onPress={() => router.push("/test-screen")} />
    </View>
  );
}
