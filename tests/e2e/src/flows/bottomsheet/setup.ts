import { BottomSheetPropsBuilder } from '@/utils/BottomSheetPropsBuilder';
import { makeUrlFromBottomSheetProps } from '@/utils/makeUrlFromBottomSheetProps';

const props = BottomSheetPropsBuilder.one().build();

export const output = {
  url: makeUrlFromBottomSheetProps(props),
};
