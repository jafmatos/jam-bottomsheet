import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { BottomSheetContentOptions } from "@e2e/utils/ContentOptions";
import { makeDeepLinkWithBottomSheetProps } from "@e2e/utils/makeDeepLinkWithBottomSheetProps";

const props = BottomSheetPropsBuilder.one().withSnapPointsCollapsed(400).withSnapPointsExpanded(600).build();

export default {
  url: makeDeepLinkWithBottomSheetProps({
    ...props,
    content: BottomSheetContentOptions.Form,
  }),
};
