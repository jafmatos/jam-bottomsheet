import { useEffect, useRef } from "react";
import { Button, View } from "react-native";
import { type BottomSheetRef, BottomSheet } from "react-native-bottomsheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalSearchParams } from "expo-router";
import { BottomSheetPropsAsString, searchParamsToBottomSheetProps } from "@/utils/searchParamsToBottomSheetProps";
import EmptyContent from "@/components/contents/EmptyContent";
import ShortTextContent from "@/components/contents/ShortTextContent";
import LongTextContent from "@/components/contents/LongTextContent";

enum ContentOptions {
  Empty = "empty",
  TextShort = "text:short",
  TextLong = "text:long",
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const openBottomSheet = () => bottomSheetRef.current?.open();
  const closeBottomSheet = () => bottomSheetRef.current?.close();
  const params = useGlobalSearchParams<BottomSheetPropsAsString & { content: ContentOptions }>();
  const bottomSheetProps = searchParamsToBottomSheetProps(params);
  const contentMap = new Map<ContentOptions, () => React.JSX.Element>([
    [ContentOptions.Empty, EmptyContent],
    [ContentOptions.TextShort, ShortTextContent],
    [ContentOptions.TextLong, LongTextContent],
  ]);
  const Content = contentMap.get(params.content) || ShortTextContent;

	useEffect(() => {
		console.log(params)
	}, [params])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Button testID="button_open-sheet" title="Open sheet" onPress={openBottomSheet} />
      <Button testID="button_close-sheet" title="Close sheet" onPress={closeBottomSheet} />

      <BottomSheet ref={bottomSheetRef} {...bottomSheetProps}>
        <Content />
      </BottomSheet>
    </View>
  );
}
