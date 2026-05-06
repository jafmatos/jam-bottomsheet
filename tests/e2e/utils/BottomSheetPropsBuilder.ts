import { type BottomSheetProps } from "react-native-bottomsheet";

export class BottomSheetPropsBuilder {
  private props: BottomSheetProps = {};

  private constructor() {}

  public static one() {
    return new BottomSheetPropsBuilder();
  }

  withExpandable(value: BottomSheetProps["expandable"]) {
    this.props.expandable = value;

    return this;
  }

  withFullscreen(value: BottomSheetProps["fullscreen"]) {
    this.props.fullscreen = value;

    return this;
  }

  withSnapPointsCollapsed(value: BottomSheetProps["snapPointsCollapsed"]) {
    this.props.snapPointsCollapsed = value;

    return this;
  }

  withSnapPointsExpanded(value: BottomSheetProps["snapPointsExpanded"]) {
    this.props.snapPointsExpanded = value;

    return this;
  }

  withBackdropOpacity(value: BottomSheetProps["backdropOpacity"]) {
    this.props.backdropOpacity = value;

    return this;
  }

  withBackdropColor(value: BottomSheetProps["backdropColor"]) {
    this.props.backdropColor = value;

    return this;
  }

  withBackgroundColor(value: BottomSheetProps["backgroundColor"]) {
    this.props.backgroundColor = value;

    return this;
  }

  withBorderRadius(value: BottomSheetProps["borderRadius"]) {
    this.props.borderRadius = value;

    return this;
  }

  withHandleColor(value: BottomSheetProps["handleColor"]) {
    this.props.handleColor = value;

    return this;
  }

  withHideHandle(value: BottomSheetProps["hideHandle"]) {
    this.props.hideHandle = value;

    return this;
  }

  withAnimationDuration(value: BottomSheetProps["animationDuration"]) {
    this.props.animationDuration = value;

    return this;
  }

  withCloseOnBackdropTap(value: BottomSheetProps["closeOnBackdropTap"]) {
    this.props.closeOnBackdropTap = value;

    return this;
  }

  withPanSnapPoints(value: BottomSheetProps["panSnapPoints"]) {
    this.props.panSnapPoints = value;

    return this;
  }

  withOnClose(value: BottomSheetProps["onClose"]) {
    this.props.onClose = value;

    return this;
  }

  withScrollViewContentContainerStyle(value: BottomSheetProps["scrollViewContentContainerStyle"]) {
    this.props.scrollViewContentContainerStyle = value;

    return this;
  }

  build() {
    return this.props;
  }
}
