import { useRef } from 'react';
import { Button, Text } from 'react-native';
import { BottomSheet, type BottomSheetRef } from 'react-native-bottomsheet';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const openBottomSheet = () => bottomSheetRef.current?.open();
  const closeBottomSheet = () => bottomSheetRef.current?.close();

  return (
    <SafeAreaView>
      <Button
        testID="button_open-sheet"
        title="Open sheet"
        onPress={openBottomSheet}
      />
      <Button
        testID="button_close-sheet"
        title="Close sheet"
        onPress={closeBottomSheet}
      />

			<Text>Test text</Text>

      <BottomSheet ref={bottomSheetRef}>
        <Text>Bottomsheet content</Text>
      </BottomSheet>
    </SafeAreaView>
  );
}

export default HomeScreen;
