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
export interface BottomSheetCommonProps extends React.ComponentProps<typeof Animated.View> {
    imperative?: boolean;
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
export type BottomSheetControlledProps = Omit<BottomSheetCommonProps, 'imperative' | 'isOpen' | 'onCloseAnimationFinished'> & {
    imperative?: false;
    isOpen: boolean;
    onCloseAnimationFinished: Required<BottomSheetCommonProps>['onCloseAnimationFinished'];
};
export type BottomSheetImperativeProps = Omit<BottomSheetCommonProps, 'imperative' | 'isOpen'> & {
    imperative: true;
    isOpen?: never;
};
export type BottomSheetProps = BottomSheetControlledProps | BottomSheetImperativeProps;
export declare const BOTTOMSHEET_DEFAULT_PROPS: Pick<Required<BottomSheetProps>, 'imperative' | 'expandable' | 'fullscreen' | 'snapPointsCollapsed' | 'backdropOpacity' | 'backdropColor' | 'backgroundColor' | 'borderRadius' | 'handleColor' | 'hideHandle' | 'panSnapPoints' | 'animationDuration' | 'closeOnBackdropTap' | 'captureGestureOnScrollStart' | 'captureGestureOnScrollEnd' | 'dismissKeyboardOnClose'>;
export declare const BottomSheet: React.ForwardRefExoticComponent<(Omit<BottomSheetControlledProps, "ref"> | Omit<BottomSheetImperativeProps, "ref">) & React.RefAttributes<BottomSheetRef>>;
//# sourceMappingURL=BottomSheet.d.ts.map