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
  <img
    src="https://github.com/jafmatos/jam-bottomsheet/raw/main/package/static/demo.gif"
    width="300"
  />
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

      <BottomSheet 
        isOpen={isOpen} 
        onCloseAnimationFinished={() => setIsOpen(false)}
      >
        <Text>Hello from the bottom sheet</Text>
      </BottomSheet>
    </View>
  );
}
```

---

# Controlled vs Imperative API

`jam-bottomsheet` supports both declarative and imperative usage patterns.

Use the controlled API (`isOpen` and `onCloseAnimationFinished`) for state-driven interfaces and dynamic content.

Use the imperative API (`open()` and `close()`) for maximum responsiveness and direct control over presentation.

---

# Usage with Imperative API

## Animation Hooks

The imperative API methods `open()` and `close()` accept an optional hooks object.

```ts
export type BottomSheetAnimationCallback = () => void;

export interface BottomSheetAnimationHooks {
  onStarted?: BottomSheetAnimationCallback;
  onFinished?: BottomSheetAnimationCallback;
}

export interface BottomSheetRef {
  open: (hooks?: BottomSheetAnimationHooks) => void;
  close: (hooks?: BottomSheetAnimationHooks) => void;
}
```

---

## Example

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
    bottomSheetRef.current?.open({
      onStarted: () => console.log("Bottom Sheet started to open"),
      onFinished: () => console.log("Bottom Sheet is fully opened"),
    });
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close({
      onStarted: () => console.log("Bottom Sheet started to close"),
      onFinished: () => console.log("Bottom Sheet is fully closed"),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Open Bottom Sheet"
        onPress={openBottomSheet}
      />

      <Button
        title="Close Bottom Sheet"
        onPress={closeBottomSheet}
      />

      <BottomSheet imperative ref={bottomSheetRef}>
        <Text>Hello from the bottom sheet</Text>
      </BottomSheet>
    </View>
  );
}
```

---

## Loading state-driven content

The imperative API allows the bottom sheet to start animating immediately, without waiting for a React re-render.

When the sheet content depends on state updates, the animation may begin before the new content is rendered. This can cause visual inconsistencies during the transition, such as content appearing midway through the opening animation.

To coordinate rendering with the animation lifecycle, you can use animation hooks to delay the state update until the opening animation finishes.

```tsx
import React, { useState } from "react";
import { FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetRef, BottomSheet } from "jam-bottomsheet";

const posts = [
  {
    id: 1,
    title: "React Native"
  },
  // ...
]

export default function App() {
  const [post, setPost] = useState<(typeof posts)[number] | undefined>();
  const bottomSheetRef = React.useRef<BottomSheetRef>(null);

  const detailPost = (post: (typeof posts)[number]) => {
    bottomSheetRef.current?.open({
      onFinished: () => setPost(post),
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => detailPost(item)}>
              <Text>{item.title}</Text>
            </Pressable>
          );
        }}
      />

      <BottomSheet 
        imperative 
        ref={bottomSheetRef} 
        onCloseAnimationFinished={() => setPost(undefined)}
      >
        {
          post ? 
            <Text>{post.title}</Text> : 
            <Text>Post is loading...</Text>
        }
      </BottomSheet>
    </SafeAreaView>
  );
}
```

---

# Expandable Bottom Sheet

```tsx
<BottomSheet
  isOpen={isOpen} 
  onCloseAnimationFinished={() => setIsOpen(false)}  
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
  onCloseAnimationFinished={() => setIsOpen(false)}
  fullscreen
>
  {/* content */}
</BottomSheet>
```

---

# Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `imperative` | `boolean` |  | `false` | Enables imperative control via refs instead of declarative state-based control |
| `isOpen` | `boolean` | Required when `imperative` is `false` | `false` | Determines if the sheet is open |
| `expandable` | `boolean` |  | `false` | Enables expand/collapse behavior |
| `fullscreen` | `boolean` |  | `false` | Makes the sheet fullscreen |
| `snapPointsCollapsed` | `number` |  | `400` | Height when collapsed |
| `snapPointsExpanded` | `number` |  | `screen height` | Height when expanded |
| `backdropOpacity` | `number` |  | `0.5` | Backdrop opacity |
| `backdropColor` | `string` |  | `#000000` | Backdrop color |
| `backgroundColor` | `string` |  | `#ffffff` | Sheet background color |
| `borderRadius` | `number` |  | `24` | Top border radius |
| `handleColor` | `string` |  | `#000000` | Handle color |
| `hideHandle` | `boolean` |  | `false` | Hides the handle |
| `panSnapPoints` | `number` |  | `100` | Gesture threshold |
| `animationDuration` | `number` |  | `300` | Animation duration |
| `closeOnBackdropTap` | `boolean` |  | `true` | Close when backdrop is tapped |
| `dismissKeyboardOnClose` | `boolean` |  | `true` | Dismiss keyboard on close |
| `captureGestureOnScrollStart` | `boolean` |  | `true` | Allows the sheet to capture downward gestures when the internal scroll view is at the top |
| `captureGestureOnScrollEnd` | `boolean` |  | `true` | Allows the sheet to capture upward gestures when the internal scroll view is at the bottom |
| `onOpenAnimationStarted` | `() => void` |  | `undefined` | Called when open animation starts |
| `onOpenAnimationFinished` | `() => void` |  | `undefined` | Called when open animation is finished |
| `onCloseAnimationStarted` | `() => void` |  | `undefined` | Called when close animation starts |
| `onCloseAnimationFinished` | `() => void` | Required when `imperative` is `false` | `undefined` | Called when close animation is finished |
| `scrollViewContentContainerStyle` | `ViewStyle` |  | `undefined` | ScrollView content style |

---

# Notes

- The bottom sheet should generally be rendered outside safe area containers, as it already handles safe area boundaries internally
- It is recommended to use portals such as `@gorhom/portal` to avoid visual inconsistencies caused by parent layouts, such as safe areas, clipping, or stacking issues
- When using the imperative API with state-driven content, avoid changing the rendered content while the sheet is animating to prevent visual inconsistencies during the transition
- Content is rendered inside an internal `ScrollView`
- Keyboard appearance and dismissal animations are handled automatically
- Gesture conflicts with nested scrolling are handled internally
- Works well with forms and text inputs

---

# License

MIT
