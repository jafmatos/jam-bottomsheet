import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { makeDeepLinkWithBottomSheetProps } from "@e2e/utils/makeDeepLinkWithBottomSheetProps";

const props = BottomSheetPropsBuilder.one().build();

export default {
  url: makeDeepLinkWithBottomSheetProps(props),
};
