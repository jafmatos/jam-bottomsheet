import { BottomSheetContentOptions } from "@e2e/utils/BottomSheetContentOptions";
import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { makeDeepLinkFromBottomSheetProps } from "@e2e/utils/makeDeepLinkFromBottomSheetProps";

const props = BottomSheetPropsBuilder.one()
  .withSnapPointsCollapsed(400)
  .withCaptureGestureOnScrollStart(false)
  .withCaptureGestureOnScrollEnd(false)
  .build();

export default {
  url: makeDeepLinkFromBottomSheetProps({
    ...props,
    content: BottomSheetContentOptions.Gallery,
  }),
};
