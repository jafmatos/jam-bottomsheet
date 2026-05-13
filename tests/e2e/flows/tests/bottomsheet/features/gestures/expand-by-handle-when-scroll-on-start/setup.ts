import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { BottomSheetContentOptions } from "@e2e/utils/BottomSheetContentOptions";
import { makeDeepLinkFromBottomSheetProps } from "@e2e/utils/makeDeepLinkFromBottomSheetProps";

const props = BottomSheetPropsBuilder.one()
  .withExpandable(true)
  .withSnapPointsCollapsed(400)
  .withSnapPointsExpanded(600)
  .withCaptureGestureOnScrollStart(true)
  .withCaptureGestureOnScrollEnd(true)
  .build();

export default {
  url: makeDeepLinkFromBottomSheetProps({
    ...props,
    content: BottomSheetContentOptions.LongText,
  }),
};
