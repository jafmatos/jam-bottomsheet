import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { BottomSheetContentOptions } from "@e2e/utils/BottomSheetContentOptions";
import { makeDeepLinkFromBottomSheetProps } from "@e2e/utils/makeDeepLinkFromBottomSheetProps";

const props = BottomSheetPropsBuilder.one().withSnapPointsCollapsed(400).build();

export default {
  url: makeDeepLinkFromBottomSheetProps({
    ...props,
    content: BottomSheetContentOptions.Empty,
  }),
};
