"use strict";

/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Dimensions, Keyboard, Pressable, ScrollView, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { scheduleOnRN, scheduleOnUI } from 'react-native-worklets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const screenDimensions = Dimensions.get('screen');
const SCREEN_HEIGHT = screenDimensions.height;
const SCREEN_WIDTH = screenDimensions.width;
export const BOTTOMSHEET_DEFAULT_PROPS = {
  expandable: false,
  fullscreen: false,
  snapPointsCollapsed: 400,
  backdropOpacity: 0.5,
  backdropColor: '#000000',
  backgroundColor: '#ffffff',
  borderRadius: 24,
  handleColor: '#000000',
  hideHandle: false,
  panSnapPoints: 100,
  animationDuration: 300,
  closeOnBackdropTap: true,
  captureGestureOnScrollStart: true,
  captureGestureOnScrollEnd: true,
  dismissKeyboardOnClose: true
};
export const BottomSheet = /*#__PURE__*/React.forwardRef(function BottomSheet({
  expandable = BOTTOMSHEET_DEFAULT_PROPS.expandable,
  fullscreen = BOTTOMSHEET_DEFAULT_PROPS.fullscreen,
  snapPointsCollapsed = BOTTOMSHEET_DEFAULT_PROPS.snapPointsCollapsed,
  backdropOpacity = BOTTOMSHEET_DEFAULT_PROPS.backdropOpacity,
  backdropColor = BOTTOMSHEET_DEFAULT_PROPS.backdropColor,
  backgroundColor = BOTTOMSHEET_DEFAULT_PROPS.backgroundColor,
  borderRadius = BOTTOMSHEET_DEFAULT_PROPS.borderRadius,
  handleColor = BOTTOMSHEET_DEFAULT_PROPS.handleColor,
  hideHandle = BOTTOMSHEET_DEFAULT_PROPS.hideHandle,
  panSnapPoints = BOTTOMSHEET_DEFAULT_PROPS.panSnapPoints,
  animationDuration = BOTTOMSHEET_DEFAULT_PROPS.animationDuration,
  closeOnBackdropTap = BOTTOMSHEET_DEFAULT_PROPS.closeOnBackdropTap,
  dismissKeyboardOnClose = BOTTOMSHEET_DEFAULT_PROPS.dismissKeyboardOnClose,
  captureGestureOnScrollStart = BOTTOMSHEET_DEFAULT_PROPS.captureGestureOnScrollStart,
  captureGestureOnScrollEnd = BOTTOMSHEET_DEFAULT_PROPS.captureGestureOnScrollEnd,
  ...props
}, ref) {
  const insets = useSafeAreaInsets();
  const [isScrollViewOnStart, _setIsScrollViewOnStart] = useState(true);
  const [isScrollViewOnEnd, _setIsScrollViewOnEnd] = useState(true);
  const snapPointsScreen = SCREEN_HEIGHT - insets.top;
  const snapPointsExpanded = props.snapPointsExpanded || snapPointsScreen;
  const bottomSheetOpenedTranslateY = 0;
  const setIsScrollViewOnStart = value => {
    if (value === isScrollViewOnStart) return;
    _setIsScrollViewOnStart(value);
  };
  const setIsScrollViewOnEnd = value => {
    if (value === isScrollViewOnEnd) return;
    _setIsScrollViewOnEnd(value);
  };
  if (fullscreen) snapPointsCollapsed = snapPointsScreen;
  const isOpenSharedValue = useSharedValue(false);
  const isExpandedSharedValue = useSharedValue(false);
  const isKeyboardOpenedSharedValue = useSharedValue(false);
  const isKeyboardOpeningSharedValue = useSharedValue(false);
  const isKeyboardClosedSharedValue = useSharedValue(false);
  const isKeyboardClosingSharedValue = useSharedValue(false);
  const scrollViewContentSizeSharedValue = useSharedValue(0);
  const scrollViewLayoutSizeSharedValue = useSharedValue(0);
  const scrollViewContentOffsetSharedValue = useSharedValue(0);
  const bottomSheetHeightSharedValue = useSharedValue(snapPointsCollapsed);
  const bottomSheetTranslateYSharedValue = useSharedValue(SCREEN_HEIGHT);
  const keyboardHeightSharedValue = useSharedValue(0);
  const backdropOpacitySharedValue = useSharedValue(0);
  const calculateAvailableHeight = useCallback(targetHeight => {
    'worklet';

    return Math.min(targetHeight, snapPointsScreen - keyboardHeightSharedValue.value);
  }, [keyboardHeightSharedValue.value, snapPointsScreen]);
  const setBottomSheetHeight = useCallback(height => {
    'worklet';

    bottomSheetHeightSharedValue.value = calculateAvailableHeight(height);
  }, [bottomSheetHeightSharedValue, calculateAvailableHeight]);
  const setBottomSheetHeightAnimated = useCallback(height => {
    'worklet';

    bottomSheetHeightSharedValue.value = withSpring(calculateAvailableHeight(height), {
      duration: animationDuration
    });
  }, [animationDuration, bottomSheetHeightSharedValue, calculateAvailableHeight]);
  const dismissKeyboard = () => Keyboard.dismiss();
  const open = useCallback(() => {
    'worklet';

    isOpenSharedValue.value = true;
    setBottomSheetHeight(snapPointsCollapsed);
    backdropOpacitySharedValue.value = withSpring(backdropOpacity, {
      duration: animationDuration
    });
    bottomSheetTranslateYSharedValue.value = withSpring(bottomSheetOpenedTranslateY, {
      duration: animationDuration
    });
  }, [isOpenSharedValue, setBottomSheetHeight, snapPointsCollapsed, backdropOpacitySharedValue, backdropOpacity, animationDuration, bottomSheetTranslateYSharedValue]);
  const close = useCallback(() => {
    'worklet';

    dismissKeyboardOnClose && scheduleOnRN(dismissKeyboard);
    isOpenSharedValue.value = false;
    isExpandedSharedValue.value = false;
    backdropOpacitySharedValue.value = withSpring(0, {
      duration: animationDuration
    });
    bottomSheetTranslateYSharedValue.value = withSpring(bottomSheetHeightSharedValue.value, {
      duration: animationDuration
    }, () => {
      props.onClose && scheduleOnRN(props.onClose);
    });
  }, [isOpenSharedValue, isExpandedSharedValue, backdropOpacitySharedValue, bottomSheetTranslateYSharedValue, bottomSheetHeightSharedValue.value, dismissKeyboardOnClose, animationDuration, props.onClose]);
  const collapse = useCallback(() => {
    'worklet';

    setBottomSheetHeightAnimated(snapPointsCollapsed);
    bottomSheetTranslateYSharedValue.value = withSpring(bottomSheetOpenedTranslateY, {
      duration: animationDuration
    });
    isExpandedSharedValue.value = false;
  }, [animationDuration, bottomSheetTranslateYSharedValue, isExpandedSharedValue, setBottomSheetHeightAnimated, snapPointsCollapsed]);
  const expand = useCallback(() => {
    'worklet';

    setBottomSheetHeightAnimated(snapPointsExpanded);
    bottomSheetTranslateYSharedValue.value = withSpring(bottomSheetOpenedTranslateY, {
      duration: animationDuration
    });
    isExpandedSharedValue.value = true;
  }, [animationDuration, bottomSheetTranslateYSharedValue, isExpandedSharedValue, setBottomSheetHeightAnimated, snapPointsExpanded]);
  useEffect(() => {
    props.isOpen ? scheduleOnUI(open) : scheduleOnUI(close);
  }, [props.isOpen, open, close]);
  useImperativeHandle(ref, () => {
    return {
      open: () => scheduleOnUI(open),
      close: () => scheduleOnUI(close)
    };
  }, [open, close]);
  useKeyboardHandler({
    onStart: () => {
      'worklet';

      if (!isKeyboardOpenedSharedValue.value) {
        isKeyboardOpeningSharedValue.value = true;
        isKeyboardClosingSharedValue.value = false;
        isKeyboardClosedSharedValue.value = false;
      } else {
        isKeyboardOpeningSharedValue.value = false;
        isKeyboardClosingSharedValue.value = true;
        isKeyboardOpenedSharedValue.value = false;
      }
    },
    onMove: event => {
      'worklet';

      keyboardHeightSharedValue.value = event.height;
      const expectedBottomSheetHeight = isExpandedSharedValue.value ? snapPointsExpanded : snapPointsCollapsed;
      setBottomSheetHeight(expectedBottomSheetHeight);
    },
    onEnd: () => {
      'worklet';

      if (isKeyboardOpeningSharedValue.value) {
        isKeyboardOpenedSharedValue.value = true;
        isKeyboardOpeningSharedValue.value = false;
      }
      if (isKeyboardClosingSharedValue.value) {
        isKeyboardClosedSharedValue.value = true;
        isKeyboardClosingSharedValue.value = false;
      }
    }
  }, []);
  const panDownGestureOnBeginCallback = () => {
    'worklet';
  };
  const panDownGestureOnChangeCallback = event => {
    'worklet';

    if (event.translationY < 0) return;
    bottomSheetTranslateYSharedValue.value = withSpring(bottomSheetOpenedTranslateY + event.translationY, {
      duration: animationDuration
    });
  };
  const panDownGestureOnFinalizeCallback = event => {
    'worklet';

    if (event.translationY < 0) return;
    if (event.translationY < panSnapPoints) {
      setBottomSheetHeightAnimated(isExpandedSharedValue.value ? snapPointsExpanded : snapPointsCollapsed);
      bottomSheetTranslateYSharedValue.value = withSpring(bottomSheetOpenedTranslateY, {
        duration: animationDuration
      });
    }
    if (event.translationY >= snapPointsCollapsed / 2 + panSnapPoints) {
      close();
      return;
    }
    if (event.translationY >= panSnapPoints && !isExpandedSharedValue.value) close();
    if (event.translationY >= panSnapPoints && isExpandedSharedValue.value) collapse();
  };
  const panUpGestureOnBeginCallback = () => {
    'worklet';
  };
  const panUpGestureOnChangeCallback = event => {
    'worklet';

    if (event.translationY > 0 || fullscreen) return;
    if (!expandable) {
      setBottomSheetHeightAnimated(snapPointsCollapsed + Math.abs(event.translationY / 5));
    }
    if (expandable && !isExpandedSharedValue.value) {
      setBottomSheetHeightAnimated(snapPointsCollapsed + Math.abs(event.translationY));
    }
  };
  const panUpGestureOnFinalizeCallback = event => {
    'worklet';

    if (event.translationY > 0 || isExpandedSharedValue.value || fullscreen) return;
    if (event.translationY > -panSnapPoints) collapse();
    if (event.translationY <= -panSnapPoints && !expandable) collapse();
    if (event.translationY <= -panSnapPoints && expandable) expand();
  };
  const panDown = Gesture.Pan().onBegin(panDownGestureOnBeginCallback).onChange(panDownGestureOnChangeCallback).onFinalize(panDownGestureOnFinalizeCallback);
  const panUp = Gesture.Pan().onBegin(panUpGestureOnBeginCallback).onChange(panUpGestureOnChangeCallback).onFinalize(panUpGestureOnFinalizeCallback);
  const nativePanDown = Gesture.Pan().onBegin(panDownGestureOnBeginCallback).onChange(panDownGestureOnChangeCallback).onFinalize(panDownGestureOnFinalizeCallback).enabled(captureGestureOnScrollStart && isScrollViewOnStart);
  const nativePanUp = Gesture.Pan().onBegin(panUpGestureOnBeginCallback).onChange(panUpGestureOnChangeCallback).onFinalize(panUpGestureOnFinalizeCallback).enabled(captureGestureOnScrollEnd && isScrollViewOnEnd);
  const pan = Gesture.Simultaneous(panDown, panUp);
  const native = Gesture.Native().blocksExternalGesture(panDown, panUp);
  const panNative = Gesture.Simultaneous(native, nativePanDown, nativePanUp);
  const bottomSheetAnimatedStyles = useAnimatedStyle(() => {
    'worklet';

    return {
      paddingBottom: isKeyboardOpenedSharedValue.value ? 0 : insets.bottom,
      transform: [{
        translateY: bottomSheetTranslateYSharedValue.value - keyboardHeightSharedValue.value
      }]
    };
  });
  const containerAnimatedStyles = useAnimatedStyle(() => {
    'worklet';

    return {
      pointerEvents: isOpenSharedValue.value ? 'auto' : 'none'
    };
  }, [isOpenSharedValue]);
  return /*#__PURE__*/_jsx(GestureDetector, {
    gesture: pan,
    children: /*#__PURE__*/_jsxs(Animated.View, {
      testID: "bottomsheet-container",
      style: [{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - insets.top,
        position: 'absolute',
        top: insets.top
      }, props.style, containerAnimatedStyles],
      children: [/*#__PURE__*/_jsx(Animated.View, {
        testID: "bottomsheet-backdrop",
        style: {
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          transform: [{
            translateY: -insets.top
          }],
          backgroundColor: backdropColor,
          opacity: backdropOpacitySharedValue
        },
        children: /*#__PURE__*/_jsx(Pressable, {
          style: {
            width: '100%',
            height: '100%'
          },
          onPress: () => {
            if (closeOnBackdropTap) close();
          }
        })
      }), /*#__PURE__*/_jsxs(Animated.View, {
        testID: "bottomsheet",
        style: [{
          height: bottomSheetHeightSharedValue,
          width: SCREEN_WIDTH,
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          boxShadow: `0 3px 7px 0 rgba(0, 0, 0, 0.5)`,
          backgroundColor: backgroundColor
        }, bottomSheetAnimatedStyles],
        children: [!hideHandle ? /*#__PURE__*/_jsx(View, {
          testID: "bottomsheet-handle-container",
          style: {
            paddingTop: 16,
            paddingBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          },
          children: /*#__PURE__*/_jsx(View, {
            testID: "bottomsheet-handle",
            style: {
              borderRadius: 2,
              height: 4,
              width: 32,
              backgroundColor: handleColor
            }
          })
        }) : /*#__PURE__*/_jsx(_Fragment, {}), /*#__PURE__*/_jsx(GestureDetector, {
          gesture: panNative,
          children: /*#__PURE__*/_jsx(ScrollView, {
            ...props.scrollViewContentContainerProps,
            testID: "bottomsheet-content",
            onLayout: event => {
              scrollViewLayoutSizeSharedValue.value = event.nativeEvent.layout.height;
              props.scrollViewContentContainerProps?.onLayout?.(event);
            },
            onContentSizeChange: (width, height) => {
              if (height < scrollViewLayoutSizeSharedValue.value) {
                setIsScrollViewOnStart(true);
                setIsScrollViewOnEnd(true);
              }
              props.scrollViewContentContainerProps?.onContentSizeChange?.(width, height);
            },
            onScroll: event => {
              props.scrollViewContentContainerProps?.onScroll?.(event);
              const layoutSize = event.nativeEvent.layoutMeasurement.height;
              const contentOffset = event.nativeEvent.contentOffset.y;
              const contentSize = event.nativeEvent.contentSize.height;
              scrollViewContentOffsetSharedValue.value = contentOffset;
              scrollViewLayoutSizeSharedValue.value = layoutSize;
              scrollViewContentSizeSharedValue.value = contentSize;
              setIsScrollViewOnStart(contentOffset <= 0);
              setIsScrollViewOnEnd(Math.round(layoutSize + contentOffset) === Math.round(contentSize));
            },
            scrollEventThrottle: 16,
            children: props.children
          })
        })]
      })]
    })
  });
});
//# sourceMappingURL=BottomSheet.js.map