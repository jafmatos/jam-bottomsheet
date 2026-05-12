import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { makeDeepLinkFromBottomSheetProps } from "@e2e/utils/makeDeepLinkFromBottomSheetProps";

const props = BottomSheetPropsBuilder.one().withExpandable(true).withSnapPointsExpanded(600).build();

export default {
  url: makeDeepLinkFromBottomSheetProps(props),
};
