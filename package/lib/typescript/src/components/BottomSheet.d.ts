import React from 'react';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
export interface BottomSheetProps extends React.ComponentProps<typeof Animated.View> {
    children?: React.ReactNode;
    testIdPrefix?: string;
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
    scrollViewContentContainerStyle?: React.ComponentProps<typeof ScrollView>['style'];
}
export interface BottomSheetRef {
    open: () => void;
    close: () => void;
}
export declare const BOTTOMSHEET_DEFAULT_PROPS: Pick<Required<BottomSheetProps>, 'testIdPrefix' | 'expandable' | 'fullscreen' | 'closeOnBackdropTap' | 'snapPointsCollapsed' | 'panSnapPoints' | 'backdropOpacity' | 'backdropColor' | 'backgroundColor' | 'borderRadius' | 'handleColor' | 'showHandle' | 'animationDuration'>;
export declare const BottomSheet: React.ForwardRefExoticComponent<Omit<BottomSheetProps, "ref"> & React.RefAttributes<BottomSheetRef>>;
//# sourceMappingURL=BottomSheet.d.ts.map