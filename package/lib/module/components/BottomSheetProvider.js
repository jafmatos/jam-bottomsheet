"use strict";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { jsx as _jsx } from "react/jsx-runtime";
export const BottomSheetProvider = props => {
  return /*#__PURE__*/_jsx(KeyboardProvider, {
    children: /*#__PURE__*/_jsx(GestureHandlerRootView, {
      children: props.children
    })
  });
};
//# sourceMappingURL=BottomSheetProvider.js.map