import React from 'react';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
export interface BottomSheetProps extends React.ComponentProps<typeof Animated.View> {
    isOpen?: boolean;
    onClose?: () => void;
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
export interface BottomSheetRef {
    open: (onEndAnimation?: () => void) => void;
    close: (onEndAnimation?: () => void) => void;
}
export declare const BOTTOMSHEET_DEFAULT_PROPS: Pick<Required<BottomSheetProps>, 'expandable' | 'fullscreen' | 'snapPointsCollapsed' | 'backdropOpacity' | 'backdropColor' | 'backgroundColor' | 'borderRadius' | 'handleColor' | 'hideHandle' | 'panSnapPoints' | 'animationDuration' | 'closeOnBackdropTap' | 'captureGestureOnScrollStart' | 'captureGestureOnScrollEnd' | 'dismissKeyboardOnClose'>;
export declare const BottomSheet: React.ForwardRefExoticComponent<Omit<BottomSheetProps, "ref"> & React.RefAttributes<BottomSheetRef>>;
//# sourceMappingURL=BottomSheet.d.ts.map