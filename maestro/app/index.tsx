import { useRef } from 'react';
import { Button, Text, View } from 'react-native';
import { BottomSheet, type BottomSheetRef } from 'react-native-bottomsheet';
import {
	useSafeAreaInsets
} from 'react-native-safe-area-context';

function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const openBottomSheet = () => bottomSheetRef.current?.open();
  const closeBottomSheet = () => bottomSheetRef.current?.close();

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
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

      <BottomSheet ref={bottomSheetRef}>
        <Text>Bottomsheet content</Text>
      </BottomSheet>
    </View>
  );
}

export default HomeScreen;
