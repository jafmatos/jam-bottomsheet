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
export declare const BOTTOMSHEET_DEFAULT_PROPS: Pick<Required<BottomSheetProps>, 'expandable' | 'fullscreen' | 'snapPointsCollapsed' | 'backdropOpacity' | 'backdropColor' | 'backgroundColor' | 'borderRadius' | 'handleColor' | 'hideHandle' | 'panSnapPoints' | 'animationDuration' | 'closeOnBackdropTap' | 'captureGestureOnScrollStart' | 'captureGestureOnScrollEnd' | 'dismissKeyboardOnClose'>;
export declare const BottomSheet: ({ expandable, fullscreen, snapPointsCollapsed, backdropOpacity, backdropColor, backgroundColor, borderRadius, handleColor, hideHandle, panSnapPoints, animationDuration, closeOnBackdropTap, dismissKeyboardOnClose, captureGestureOnScrollStart, captureGestureOnScrollEnd, ...props }: BottomSheetProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BottomSheet.d.ts.map