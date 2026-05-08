import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { BottomSheetContentOptions } from "@e2e/utils/ContentOptions";
import { makeDeepLinkWithBottomSheetProps } from "@e2e/utils/makeDeepLinkWithBottomSheetProps";

const props = BottomSheetPropsBuilder.one().withExpandable(true).build();

export default {
  url: makeDeepLinkWithBottomSheetProps({ ...props, content: BottomSheetContentOptions.Empty }),
};
