import { BottomSheetContentOptions } from "@e2e/utils/BottomSheetContentOptions";
import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { makeDeepLinkFromBottomSheetProps } from "@e2e/utils/makeDeepLinkFromBottomSheetProps";

const props = BottomSheetPropsBuilder.one().withCloseOnBackdropTap(true).build();

export default {
  url: makeDeepLinkFromBottomSheetProps({ ...props, content: BottomSheetContentOptions.Empty }),
};
