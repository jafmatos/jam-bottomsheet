# jam-bottomsheet

[![npm version](https://img.shields.io/npm/v/jam-bottomsheet?color=blue)](https://www.npmjs.com/package/jam-bottomsheet)
[![npm downloads](https://img.shields.io/npm/dm/jam-bottomsheet?color=2e9f40)](https://www.npmjs.com/package/jam-bottomsheet)
[![license](https://img.shields.io/npm/l/jam-bottomsheet?color=red)](https://github.com/jafmatos/jam-bottomsheet/blob/main/LICENSE)

A lightweight and highly customizable React Native bottom sheet built with:

- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-keyboard-controller`
- `react-native-worklets`

Designed for smooth gestures, keyboard-aware interactions, expandable snap points, fullscreen presentations, and seamless nested scrolling.

<p align="center">
  <img src="./static/demo.gif" width="300" />
</p>

---

# Features

- Smooth UI-thread animations powered by Reanimated
- Expandable and fullscreen modes
- Keyboard-aware behavior and animations
- Nested scrolling support with gesture conflict handling
- Supports both controlled and imperative APIs
- Built-in backdrop support
- Built-in safe area handling
- Highly customizable appearance and behavior
- Optimized with Reanimated worklets
- End-to-end tested with Maestro

---

# Installation

```bash
npm install jam-bottomsheet
```

Install peer dependencies if you don't already have them:

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-keyboard-controller react-native-worklets
```

---

# Setup

## Provider Setup

Wrap your application with `BottomSheetProvider`:

```tsx
import { BottomSheetProvider } from 'jam-bottomsheet';

export default function App() {
  return (
    <BottomSheetProvider>
      {/* app */}
    </BottomSheetProvider>
  );
}
```

---

## React Native Reanimated

Add the Reanimated babel plugin:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

---

# Basic Usage

```tsx
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import {
  BottomSheet,
} from 'jam-bottomsheet';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Open Bottom Sheet"
        onPress={() => setIsOpen(true)}
      />

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Text>Hello from the bottom sheet</Text>
      </BottomSheet>
    </View>
  );
}
```

---

# Controlled vs Imperative API

`jam-bottomsheet` supports both declarative and imperative usage patterns.

Use the controlled API (`isOpen`) for state-driven interfaces and dynamic content.

Use the imperative API (`open()` and `close()`) for maximum responsiveness and direct control over presentation.

---

# Usage with Imperative API

```tsx
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import {
  BottomSheet,
  type BottomSheetRef,
} from 'jam-bottomsheet';

export default function App() {
  const bottomSheetRef = React.useRef<BottomSheetRef>(null);

  const openBottomSheet = () => {
	  bottomSheetRef.current?.open();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Open Bottom Sheet"
        onPress={openBottomSheet}
      />

      <BottomSheet ref={bottomSheetRef}>
        <Text>Hello from the bottom sheet</Text>
      </BottomSheet>
    </View>
  );
}
```

---

# Expandable Bottom Sheet

```tsx
<BottomSheet
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}  
  expandable
  snapPointsCollapsed={300}
  snapPointsExpanded={700}
>
  {/* content */}
</BottomSheet>
```

Swipe up to expand and swipe down to collapse.

---

# Fullscreen Bottom Sheet

```tsx
<BottomSheet
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  fullscreen
>
  {/* content */}
</BottomSheet>
```

---

# Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | `false` | Determines if the sheet is open |
| `expandable` | `boolean` | `false` | Enables expand/collapse behavior |
| `fullscreen` | `boolean` | `false` | Makes the sheet fullscreen |
| `snapPointsCollapsed` | `number` | `400` | Height when collapsed |
| `snapPointsExpanded` | `number` | `screen height` | Height when expanded |
| `backdropOpacity` | `number` | `0.5` | Backdrop opacity |
| `backdropColor` | `string` | `#000000` | Backdrop color |
| `backgroundColor` | `string` | `#ffffff` | Sheet background color |
| `borderRadius` | `number` | `24` | Top border radius |
| `handleColor` | `string` | `#000000` | Handle color |
| `hideHandle` | `boolean` | `false` | Hides the handle |
| `panSnapPoints` | `number` | `100` | Gesture threshold |
| `animationDuration` | `number` | `300` | Animation duration |
| `closeOnBackdropTap` | `boolean` | `true` | Close when backdrop is tapped |
| `dismissKeyboardOnClose` | `boolean` | `true` | Dismiss keyboard on close |
| `captureGestureOnScrollStart` | `boolean` | `true` | Allows the sheet to capture downward gestures when the internal scroll view is at the top |
| `captureGestureOnScrollEnd` | `boolean` | `true` | Allows the sheet to capture upward gestures when the internal scroll view is at the bottom |
| `onClose` | `() => void` | `undefined` | Called after close animation |
| `scrollViewContentContainerStyle` | `ViewStyle` | `undefined` | ScrollView content style |

---

# Notes

- The bottom sheet should generally be rendered outside safe area containers, as it already handles safe area boundaries internally
- It is recommended to use portals such as `@gorhom/portal` to avoid visual inconsistencies caused by parent layouts, such as safe areas, clipping, or stacking issues
- When using the imperative API with state-driven content, ensure the content is rendered before opening the sheet to avoid visual inconsistencies during the animation
- Content is rendered inside an internal `ScrollView`
- Keyboard appearance and dismissal animations are handled automatically
- Gesture conflicts with nested scrolling are handled internally
- Works well with forms and text inputs

---

# License

MIT
