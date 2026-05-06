import { type BottomSheetProps } from "react-native-bottomsheet";
import { BASE_URL } from "../constants";

export const makeDeepLinkWithBottomSheetProps = (props: BottomSheetProps & { content?: string }) => {
  const params = new URLSearchParams({
    props: JSON.stringify(props),
  });

  return `${BASE_URL.replace(/\/$/, "")}?${params}`;
};
