import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { makeDeepLinkWithBottomSheetProps } from "@e2e/utils/makeDeepLinkWithBottomSheetProps";
import { BottomSheetContentOptions } from "@e2e/utils/ContentOptions";

const props = BottomSheetPropsBuilder.one().withSnapPointsCollapsed(400).build();

export default {
	url: makeDeepLinkWithBottomSheetProps({
		...props,
		content: BottomSheetContentOptions.Gallery,
	}),
}