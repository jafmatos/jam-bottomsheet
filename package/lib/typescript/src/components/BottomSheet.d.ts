import React from 'react';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
export type BottomSheetAnimationCallback = () => void;
export interface BottomSheetAnimationHooks {
    onStarted?: BottomSheetAnimationCallback;
    onFinished?: BottomSheetAnimationCallback;
}
export interface BottomSheetRef {
    open: (hooks?: BottomSheetAnimationHooks) => void;
    close: (hooks?: BottomSheetAnimationHooks) => void;
}
export interface BottomSheetControlledProps {
    imperative?: false;
    isOpen: boolean;
    onCloseAnimationFinished: Required<BottomSheetCommonProps>['onCloseAnimationFinished'];
}
export interface BottomSheetImperativeProps {
    imperative: true;
    isOpen?: never;
}
export interface BottomSheetCommonProps extends React.ComponentProps<typeof Animated.View> {
    isOpen?: boolean;
    onOpenAnimationStarted?: BottomSheetAnimationCallback;
    onOpenAnimationFinished?: BottomSheetAnimationCallback;
    onCloseAnimationStarted?: BottomSheetAnimationCallback;
    onCloseAnimationFinished?: BottomSheetAnimationCallback;
    children?: React.ReactNode;
    expandable?: boolean;
    fullscreen?: boolean;
    snapPointsCollapsed?: number;
    snapPointsExpanded?: number;
    backdropOpacity?: number;
    backdropColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    handleColor?: string;
    hideHandle?: boolean;
    panSnapPoints?: number;
    animationDuration?: number;
    closeOnBackdropTap?: boolean;
    dismissKeyboardOnClose?: boolean;
    captureGestureOnScrollStart?: boolean;
    captureGestureOnScrollEnd?: boolean;
    scrollViewContentContainerProps?: React.ComponentProps<typeof ScrollView>;
}
export type BottomSheetProps = (Omit<BottomSheetCommonProps, 'imperative' | 'isOpen' | 'onCloseAnimationFinished'> & BottomSheetControlledProps) | (Omit<BottomSheetCommonProps, 'imperative' | 'isOpen'> & BottomSheetImperativeProps);
export declare const BOTTOMSHEET_DEFAULT_PROPS: Pick<Required<BottomSheetProps>, 'imperative' | 'expandable' | 'fullscreen' | 'snapPointsCollapsed' | 'backdropOpacity' | 'backdropColor' | 'backgroundColor' | 'borderRadius' | 'handleColor' | 'hideHandle' | 'panSnapPoints' | 'animationDuration' | 'closeOnBackdropTap' | 'captureGestureOnScrollStart' | 'captureGestureOnScrollEnd' | 'dismissKeyboardOnClose'>;
export declare const BottomSheet: React.ForwardRefExoticComponent<(Omit<Omit<BottomSheetCommonProps, "onCloseAnimationFinished" | "isOpen" | "imperative"> & BottomSheetControlledProps, "ref"> | Omit<Omit<BottomSheetCommonProps, "isOpen" | "imperative"> & BottomSheetImperativeProps, "ref">) & React.RefAttributes<BottomSheetRef>>;
//# sourceMappingURL=BottomSheet.d.ts.map