import { BottomSheetProps } from "jam-bottomsheet";

export type BottomSheetPropsAsString = {
  [Key in keyof BottomSheetProps]: string;
};

export const searchParamsToBottomSheetProps = (params: BottomSheetPropsAsString): BottomSheetProps => {
  return {
    expandable: params.expandable ? params.expandable === "true" : undefined,
    fullscreen: params.fullscreen ? params.fullscreen === "true" : undefined,
    snapPointsCollapsed: params.snapPointsCollapsed ? Number(params.snapPointsCollapsed) : undefined,
    snapPointsExpanded: params.snapPointsExpanded ? Number(params.snapPointsExpanded) : undefined,
    backdropOpacity: params.backdropOpacity ? Number(params.backdropOpacity) : undefined,
    backdropColor: params.backdropColor ? (params.backdropColor as string) : undefined,
    backgroundColor: params.backgroundColor ? (params.backgroundColor as string) : undefined,
    borderRadius: params.borderRadius ? Number(params.borderRadius) : undefined,
    handleColor: params.handleColor ? (params.handleColor as string) : undefined,
    hideHandle: params.hideHandle ? params.hideHandle === "true" : undefined,
    animationDuration: params.animationDuration ? Number(params.animationDuration) : undefined,
    closeOnBackdropTap: params.closeOnBackdropTap ? params.closeOnBackdropTap === "true" : undefined,
    captureGestureOnScrollStart: params.captureGestureOnScrollStart ? params.captureGestureOnScrollStart === "true" : undefined,
    captureGestureOnScrollEnd: params.captureGestureOnScrollEnd ? params.captureGestureOnScrollEnd === "true" : undefined,
    dismissKeyboardOnClose: params.dismissKeyboardOnClose ? params.dismissKeyboardOnClose === "true" : undefined,
    panSnapPoints: params.panSnapPoints ? Number(params.panSnapPoints) : undefined,
  };
};
