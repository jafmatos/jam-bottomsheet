import {
  BOTTOMSHEET_DEFAULT_PROPS,
  type BottomSheetProps,
} from '../components/BottomSheet';

interface BottomSheetOwnProps extends Pick<
  BottomSheetProps,
  | 'expandable'
  | 'fullscreen'
  | 'snapPointsCollapsed'
  | 'snapPointsExpanded'
  | 'backdropOpacity'
  | 'backdropColor'
  | 'backgroundColor'
  | 'borderRadius'
  | 'handleColor'
  | 'showHandle'
  | 'animationDuration'
  | 'closeOnBackdropTap'
  | 'panSnapPoints'
  | 'onClose'
  | 'scrollViewContentContainerStyle'
> {}

export class BottomSheetPropsBuilder {
  private props: Partial<BottomSheetOwnProps> = BOTTOMSHEET_DEFAULT_PROPS;

  private constructor() {}

  public static one() {
    return new BottomSheetPropsBuilder();
  }

  withExpandable(value: BottomSheetOwnProps['expandable']) {
    this.props.expandable = value;

    return this;
  }

  withFullscreen(value: BottomSheetOwnProps['fullscreen']) {
    this.props.fullscreen = value;

    return this;
  }

  withSnapPointsCollapsed(value: BottomSheetOwnProps['snapPointsCollapsed']) {
    this.props.snapPointsCollapsed = value;

    return this;
  }

  withSnapPointsExpanded(value: BottomSheetOwnProps['snapPointsExpanded']) {
    this.props.snapPointsExpanded = value;

    return this;
  }

  withBackdropOpacity(value: BottomSheetOwnProps['backdropOpacity']) {
    this.props.backdropOpacity = value;

    return this;
  }

  withBackdropColor(value: BottomSheetOwnProps['backdropColor']) {
    this.props.backdropColor = value;

    return this;
  }

  withBackgroundColor(value: BottomSheetOwnProps['backgroundColor']) {
    this.props.backgroundColor = value;

    return this;
  }

  withBorderRadius(value: BottomSheetOwnProps['borderRadius']) {
    this.props.borderRadius = value;

    return this;
  }

  withHandleColor(value: BottomSheetOwnProps['handleColor']) {
    this.props.handleColor = value;

    return this;
  }

  withShowHandle(value: BottomSheetOwnProps['showHandle']) {
    this.props.showHandle = value;

    return this;
  }

  withAnimationDuration(value: BottomSheetOwnProps['animationDuration']) {
    this.props.animationDuration = value;

    return this;
  }

  withCloseOnBackdropTap(value: BottomSheetOwnProps['closeOnBackdropTap']) {
    this.props.closeOnBackdropTap = value;

    return this;
  }

  withPanSnapPoints(value: BottomSheetOwnProps['panSnapPoints']) {
    this.props.panSnapPoints = value;

    return this;
  }

  withOnClose(value: BottomSheetOwnProps['onClose']) {
    this.props.onClose = value;

    return this;
  }

  withScrollViewContentContainerStyle(
    value: BottomSheetOwnProps['scrollViewContentContainerStyle']
  ) {
    this.props.scrollViewContentContainerStyle = value;

    return this;
  }

  build() {
    return this.props;
  }
}
