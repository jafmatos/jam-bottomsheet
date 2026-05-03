import { BottomSheetProps } from "react-native-bottomsheet";

export type BottomSheetPropsAsString = {
  [Key in keyof BottomSheetProps]: string;
};

export const searchParamsToBottomSheetProps = (params: BottomSheetPropsAsString): BottomSheetProps => {
  return {
    testIdPrefix: params.testIdPrefix ? params.testIdPrefix : undefined,
    expandable: params.expandable ? params.expandable === "true" : undefined,
    fullscreen: params.fullscreen ? params.fullscreen === "true" : undefined,
    snapPointsCollapsed: params.snapPointsCollapsed ? Number(params.snapPointsCollapsed) : undefined,
    snapPointsExpanded: params.snapPointsExpanded ? Number(params.snapPointsExpanded) : undefined,
    backdropOpacity: params.backdropOpacity ? Number(params.backdropOpacity) : undefined,
    backdropColor: params.backdropColor ? (params.backdropColor as string) : undefined,
    backgroundColor: params.backgroundColor ? (params.backgroundColor as string) : undefined,
    borderRadius: params.borderRadius ? Number(params.borderRadius) : undefined,
    handleColor: params.handleColor ? (params.handleColor as string) : undefined,
    showHandle: params.showHandle ? params.showHandle === "true" : undefined,
    animationDuration: params.animationDuration ? Number(params.animationDuration) : undefined,
    closeOnBackdropTap: params.closeOnBackdropTap ? params.closeOnBackdropTap === "true" : undefined,
    panSnapPoints: params.panSnapPoints ? Number(params.panSnapPoints) : undefined,
  };
};
