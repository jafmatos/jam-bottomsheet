import { type BottomSheetProps } from "react-native-bottomsheet";
import { BASE_URL } from "../constants";

export const makeUrlFromBottomSheetProps = (props: BottomSheetProps) => {
  const params = new URLSearchParams({
    props: JSON.stringify(props),
  });

  return `${BASE_URL.replace(/\/$/, "")}?${params}`;
};
