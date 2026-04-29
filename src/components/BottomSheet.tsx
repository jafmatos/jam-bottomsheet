/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, Pressable, ScrollView, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { scheduleOnRN } from 'react-native-worklets';

export interface BottomSheetProps extends React.ComponentProps<
  typeof Animated.View
> {
  children: React.ReactNode;
  expandable?: boolean;
  fullscreen?: boolean;
  snapPointsCollapsed?: number;
  snapPointsExpanded?: number;
  backdropOpacity?: number;
  backdropColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  handleColor?: string;
  showHandle?: boolean;
  animationDuration?: number;
  closeOnBackdropTap?: boolean;
  panSnapPoints?: number;
  onClose?: () => void;
  scrollViewContentContainerStyle?: React.ComponentProps<ScrollView>['style'];
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

const screenDimensions = Dimensions.get('screen');
const SCREEN_HEIGHT = screenDimensions.height;
const SCREEN_WIDTH = screenDimensions.width;

export const BOTTOMSHEET_DEFAULT_PROPS: Pick<
  Required<BottomSheetProps>,
  | 'expandable'
  | 'fullscreen'
  | 'closeOnBackdropTap'
  | 'snapPointsCollapsed'
  | 'panSnapPoints'
  | 'backdropOpacity'
  | 'backdropColor'
  | 'backgroundColor'
  | 'borderRadius'
  | 'handleColor'
  | 'showHandle'
  | 'animationDuration'
> = {
  expandable: false,
  fullscreen: false,
  closeOnBackdropTap: true,
  snapPointsCollapsed: 400,
  panSnapPoints: 100,
  backdropOpacity: 0.5,
  backdropColor: '#000000',
  backgroundColor: '#ffffff',
  borderRadius: 24,
  handleColor: '#000000',
  showHandle: true,
  animationDuration: 300,
};

export const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet(
    {
      expandable = BOTTOMSHEET_DEFAULT_PROPS.expandable,
      fullscreen = BOTTOMSHEET_DEFAULT_PROPS.fullscreen,
      closeOnBackdropTap = BOTTOMSHEET_DEFAULT_PROPS.closeOnBackdropTap,
      snapPointsCollapsed = BOTTOMSHEET_DEFAULT_PROPS.snapPointsCollapsed,
      panSnapPoints = BOTTOMSHEET_DEFAULT_PROPS.panSnapPoints,
      backdropOpacity = BOTTOMSHEET_DEFAULT_PROPS.backdropOpacity,
      backdropColor = BOTTOMSHEET_DEFAULT_PROPS.backdropColor,
      backgroundColor = BOTTOMSHEET_DEFAULT_PROPS.backgroundColor,
      borderRadius = BOTTOMSHEET_DEFAULT_PROPS.borderRadius,
      handleColor = BOTTOMSHEET_DEFAULT_PROPS.handleColor,
      showHandle = BOTTOMSHEET_DEFAULT_PROPS.showHandle,
      animationDuration = BOTTOMSHEET_DEFAULT_PROPS.animationDuration,
      ...props
    },
    ref
  ) {
    const insets = useSafeAreaInsets();
    const [isScrollViewOnStart, _setIsScrollViewOnStart] = useState(true);
    const [isScrollViewOnEnd, _setIsScrollViewOnEnd] = useState(true);
    const snapPointsScreen = SCREEN_HEIGHT - insets.top;
    const bottomSheetOpenedTranslateY = 0;

    const setIsScrollViewOnStart = (value: boolean) => {
      if (value === isScrollViewOnStart) return;

      _setIsScrollViewOnStart(value);
    };

    const setIsScrollViewOnEnd = (value: boolean) => {
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

    const calculateAvailableHeight = useCallback(
      (targetHeight: number) => {
        'worklet';

        return Math.min(
          targetHeight,
          snapPointsScreen - keyboardHeightSharedValue.value
        );
      },
      [keyboardHeightSharedValue.value, snapPointsScreen]
    );

    const setBottomSheetHeight = useCallback(
      (height: number) => {
        'worklet';

        bottomSheetHeightSharedValue.value = calculateAvailableHeight(height);
      },
      [bottomSheetHeightSharedValue, calculateAvailableHeight]
    );

    const setBottomSheetHeightAnimated = useCallback(
      (height: number) => {
        'worklet';

        bottomSheetHeightSharedValue.value = withSpring(
          calculateAvailableHeight(height),
          { duration: animationDuration }
        );
      },
      [
        animationDuration,
        bottomSheetHeightSharedValue,
        calculateAvailableHeight,
      ]
    );

    const open = useCallback(() => {
      'worklet';

      isOpenSharedValue.value = true;

      setBottomSheetHeight(snapPointsCollapsed);

      backdropOpacitySharedValue.value = withSpring(backdropOpacity, {
        duration: animationDuration,
      });
      bottomSheetTranslateYSharedValue.value = withSpring(
        bottomSheetOpenedTranslateY,
        { duration: animationDuration }
      );
    }, [
      isOpenSharedValue,
      setBottomSheetHeight,
      snapPointsCollapsed,
      backdropOpacitySharedValue,
      backdropOpacity,
      animationDuration,
      bottomSheetTranslateYSharedValue,
    ]);

    const close = useCallback(() => {
      'worklet';

      isOpenSharedValue.value = false;
      isExpandedSharedValue.value = false;

      backdropOpacitySharedValue.value = withSpring(0, {
        duration: animationDuration,
      });
      bottomSheetTranslateYSharedValue.value = withSpring(
        bottomSheetHeightSharedValue.value,
        { duration: animationDuration },
        () => {
          props.onClose && scheduleOnRN(props.onClose);
        }
      );
    }, [
      isOpenSharedValue,
      isExpandedSharedValue,
      backdropOpacitySharedValue,
      animationDuration,
      bottomSheetTranslateYSharedValue,
      bottomSheetHeightSharedValue.value,
      props.onClose,
    ]);

    const collapse = useCallback(() => {
      'worklet';

      setBottomSheetHeightAnimated(snapPointsCollapsed);

      bottomSheetTranslateYSharedValue.value = withSpring(
        bottomSheetOpenedTranslateY,
        { duration: animationDuration }
      );
      isExpandedSharedValue.value = false;
    }, [
      animationDuration,
      bottomSheetTranslateYSharedValue,
      isExpandedSharedValue,
      setBottomSheetHeightAnimated,
      snapPointsCollapsed,
    ]);

    const expand = useCallback(() => {
      'worklet';

      setBottomSheetHeightAnimated(snapPointsScreen);

      bottomSheetTranslateYSharedValue.value = withSpring(
        bottomSheetOpenedTranslateY,
        { duration: animationDuration }
      );
      isExpandedSharedValue.value = true;
    }, [
      animationDuration,
      bottomSheetTranslateYSharedValue,
      isExpandedSharedValue,
      setBottomSheetHeightAnimated,
      snapPointsScreen,
    ]);

    useImperativeHandle(ref, () => {
      'worklet';

      return {
        open: () => scheduleOnRN(open),
        close: () => scheduleOnRN(close),
      };
    }, [open, close]);

    useKeyboardHandler(
      {
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
        onMove: (event) => {
          'worklet';

          keyboardHeightSharedValue.value = event.height;

          const expectedBottomSheetHeight = isExpandedSharedValue.value
            ? snapPointsScreen
            : snapPointsCollapsed;

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
        },
      },
      []
    );

    const panDownGestureOnBeginCallback: NonNullable<
      Parameters<ReturnType<typeof Gesture.Pan>['onBegin']>[0]
    > = () => {
      'worklet';
    };

    const panDownGestureOnChangeCallback: NonNullable<
      Parameters<ReturnType<typeof Gesture.Pan>['onChange']>[0]
    > = (event) => {
      'worklet';

      if (event.translationY < 0) return;

      bottomSheetTranslateYSharedValue.value = withSpring(
        bottomSheetOpenedTranslateY + event.translationY,
        {
          duration: animationDuration,
        }
      );
    };

    const panDownGestureOnFinalizeCallback: NonNullable<
      Parameters<ReturnType<typeof Gesture.Pan>['onFinalize']>[0]
    > = (event) => {
      'worklet';

      if (event.translationY < 0) return;

      if (event.translationY < panSnapPoints) {
        setBottomSheetHeightAnimated(
          isExpandedSharedValue.value ? snapPointsScreen : snapPointsCollapsed
        );

        bottomSheetTranslateYSharedValue.value = withSpring(
          bottomSheetOpenedTranslateY,
          { duration: animationDuration }
        );
      }

      if (event.translationY >= snapPointsCollapsed / 2 + panSnapPoints)
        close();

      if (event.translationY >= panSnapPoints && !isExpandedSharedValue.value)
        close();

      if (event.translationY >= panSnapPoints && isExpandedSharedValue.value)
        collapse();
    };

    const panUpGestureOnBeginCallback: NonNullable<
      Parameters<ReturnType<typeof Gesture.Pan>['onBegin']>[0]
    > = () => {
      'worklet';
    };

    const panUpGestureOnChangeCallback: NonNullable<
      Parameters<ReturnType<typeof Gesture.Pan>['onChange']>[0]
    > = (event) => {
      'worklet';

      if (event.translationY > 0 || fullscreen) return;

      if (!expandable) {
        setBottomSheetHeightAnimated(
          snapPointsCollapsed + Math.abs(event.translationY / 5)
        );
      }

      if (expandable && !isExpandedSharedValue.value) {
        setBottomSheetHeightAnimated(
          snapPointsCollapsed + Math.abs(event.translationY)
        );
      }
    };

    const panUpGestureOnFinalizeCallback: NonNullable<
      Parameters<ReturnType<typeof Gesture.Pan>['onFinalize']>[0]
    > = (event) => {
      'worklet';

      if (event.translationY > 0 || isExpandedSharedValue.value || fullscreen)
        return;

      if (event.translationY > -panSnapPoints) collapse();

      if (event.translationY <= -panSnapPoints && !expandable) collapse();

      if (event.translationY <= -panSnapPoints && expandable) expand();
    };

    const panDown = Gesture.Pan()
      .onBegin(panDownGestureOnBeginCallback)
      .onChange(panDownGestureOnChangeCallback)
      .onFinalize(panDownGestureOnFinalizeCallback);

    const panUp = Gesture.Pan()
      .onBegin(panUpGestureOnBeginCallback)
      .onChange(panUpGestureOnChangeCallback)
      .onFinalize(panUpGestureOnFinalizeCallback);

    const nativePanDown = Gesture.Pan()
      .onBegin(panDownGestureOnBeginCallback)
      .onChange(panDownGestureOnChangeCallback)
      .onFinalize(panDownGestureOnFinalizeCallback)
      .enabled(isScrollViewOnStart);

    const nativePanUp = Gesture.Pan()
      .onBegin(panUpGestureOnBeginCallback)
      .onChange(panUpGestureOnChangeCallback)
      .onFinalize(panUpGestureOnFinalizeCallback)
      .enabled(isScrollViewOnEnd);

    const pan = Gesture.Simultaneous(panDown, panUp);
    const native = Gesture.Native().blocksExternalGesture(panDown, panUp);
    const panNative = Gesture.Simultaneous(native, nativePanDown, nativePanUp);

    const bottomSheetAnimatedStyles = useAnimatedStyle(() => {
      'worklet';

      return {
        paddingBottom: isKeyboardOpenedSharedValue.value ? 0 : insets.bottom,
        transform: [
          {
            translateY:
              bottomSheetTranslateYSharedValue.value -
              keyboardHeightSharedValue.value,
          },
        ],
      };
    });

    const containerAnimatedStyles = useAnimatedStyle(() => {
      'worklet';

      return {
        pointerEvents: isOpenSharedValue.value ? 'auto' : 'none',
      };
    }, [isOpenSharedValue]);

    return (
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 100,
            },
            containerAnimatedStyles,
          ]}
        >
          <Animated.View
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: backdropColor,
              opacity: backdropOpacitySharedValue,
            }}
          >
            <Pressable
              style={{
                width: '100%',
                height: '100%',
              }}
              onPress={() => {
                if (!closeOnBackdropTap) return;

                close();
              }}
            />
          </Animated.View>

          <Animated.View
            style={[
              {
                height: bottomSheetHeightSharedValue,
                width: SCREEN_WIDTH,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                boxShadow: `0 3px 7px 0 rgba(0, 0, 0, 0.5)`,
                backgroundColor: backgroundColor,
              },
              bottomSheetAnimatedStyles,
            ]}
          >
            {showHandle ? (
              <View
                style={{
                  paddingTop: 16,
                  paddingBottom: 16,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    borderRadius: 2,
                    height: 4,
                    width: 32,
                    backgroundColor: handleColor,
                  }}
                />
              </View>
            ) : (
              <></>
            )}

            <GestureDetector gesture={panNative}>
              <ScrollView
                onLayout={(event) => {
                  scrollViewLayoutSizeSharedValue.value =
                    event.nativeEvent.layout.height;
                }}
                onContentSizeChange={(_width, height) => {
                  if (height < scrollViewLayoutSizeSharedValue.value) {
                    setIsScrollViewOnStart(true);
                    setIsScrollViewOnEnd(true);
                  }
                }}
                onScroll={(event) => {
                  const layoutSize = event.nativeEvent.layoutMeasurement.height;
                  const contentOffset = event.nativeEvent.contentOffset.y;
                  const contentSize = event.nativeEvent.contentSize.height;

                  scrollViewContentOffsetSharedValue.value = contentOffset;
                  scrollViewLayoutSizeSharedValue.value = layoutSize;
                  scrollViewContentSizeSharedValue.value = contentSize;

                  setIsScrollViewOnStart(contentOffset <= 0);
                  setIsScrollViewOnEnd(
                    Math.round(layoutSize + contentOffset) ===
                      Math.round(contentSize)
                  );
                }}
                scrollEventThrottle={16}
                contentContainerStyle={props.scrollViewContentContainerStyle}
              >
                {props.children}
              </ScrollView>
            </GestureDetector>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  }
);
