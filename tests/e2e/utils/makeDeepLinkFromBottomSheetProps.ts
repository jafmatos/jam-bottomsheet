import { type BottomSheetProps } from "jam-bottomsheet";
import { BASE_URL } from "../constants";

export const makeDeepLinkFromBottomSheetProps = (props: BottomSheetProps & { content?: string; useImperative?: boolean }) => {
  const params = new URLSearchParams({
    props: JSON.stringify(props),
  });

  return `${BASE_URL.replace(/\/$/, "")}?${params}`;
};
