import { BottomSheetPropsBuilder } from "@e2e/utils/BottomSheetPropsBuilder";
import { makeUrlFromBottomSheetProps } from "@e2e/utils/makeUrlFromBottomSheetProps";

export const setup = () => {
  const props = BottomSheetPropsBuilder.one().withExpandable(true).build();

  return {
    url: makeUrlFromBottomSheetProps(props),
  };
};
