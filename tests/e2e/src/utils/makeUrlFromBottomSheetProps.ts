import { type BottomSheetProps } from 'react-native-bottomsheet';
import { BASE_URL } from '../constants';

export const makeUrlFromBottomSheetProps = (props: BottomSheetProps) => {
  const params = new URLSearchParams(props as any).toString();

  console.log(params);

  return `${BASE_URL.replace(/\/$/, '')}`;
};
