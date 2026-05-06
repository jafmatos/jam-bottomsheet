import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { makeDeepLinkWithBottomSheetProps } from "@e2e/utils/makeDeepLinkWithBottomSheetProps";

const props = BottomSheetPropsBuilder.one().withCloseOnBackdropTap(false).build();

export default {
  url: makeDeepLinkWithBottomSheetProps(props),
};
