# jam-bottomsheet

A lightweight, highly customizable React Native bottom sheet built with:

- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-keyboard-controller`
- `react-native-worklets`

Designed for smooth gestures, keyboard-aware interactions, expandable snap points, fullscreen presentations, and seamless nested scrolling.

<p align="center">
  <img
    src="https://github.com/jafmatos/jam-bottomsheet/raw/main/package/static/demo.gif"
    width="300"
  />
</p>

---

# Features

- Smooth gesture handling
- Expandable bottom sheet
- Fullscreen mode
- Keyboard-aware animations
- Nested ScrollView support
- Backdrop support
- Safe area support
- Highly customizable styling
- Built with Reanimated worklets for performance

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

# Required Setup

## React Native Gesture Handler

Make sure your app is wrapped with:

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
  BottomSheetRef,
} from 'jam-bottomsheet';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Open Bottom Sheet"
        onPress={() => setIsOpen(true)}
      />

      <BottomSheet isOpen={isOpen} onCLose={() => setIsOpen(false)}>
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
	onCLose={() => setIsOpen(false)}
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
| `onClose` | `() => void` | `undefined` | Called after close animation |
| `scrollViewContentContainerStyle` | `ViewStyle` | `undefined` | ScrollView content style |

---

# Example

```tsx
import React, { useState } from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

import {
  BottomSheet,
} from 'jam-bottomsheet';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Open"
        onPress={() => setIsOpen(true)}
      />

      <BottomSheet
        isOpen={isOpen}
				onClose={() => setIsOpen(false)}
        expandable
        snapPointsCollapsed={300}
        snapPointsExpanded={700}
        backgroundColor="#fff"
      >
        <Text>
          Scrollable content here
        </Text>
      </BottomSheet>
    </View>
  );
}
```

---

# Notes

- It is recommended to use portals such as `@gorhom/portal` to avoid visual inconsistencies caused by parent layouts, such as safe areas, clipping, or stacking issues
- The bottom sheet internally uses a `ScrollView`
- Keyboard animations are handled automatically
- Gesture conflicts with nested scrolling are handled internally
- Works well with forms and text inputs

---

# License

MIT
