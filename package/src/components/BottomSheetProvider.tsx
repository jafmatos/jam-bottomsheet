import type { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const BottomSheetProvider = (props: PropsWithChildren) => {
  return (
    <KeyboardProvider>
      <GestureHandlerRootView>{props.children}</GestureHandlerRootView>
    </KeyboardProvider>
  );
};
