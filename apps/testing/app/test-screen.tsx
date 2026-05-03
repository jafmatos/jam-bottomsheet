import { useEffect, useMemo, useRef } from "react";
import { Button, View } from "react-native";
import { type BottomSheetRef, BottomSheet, BottomSheetProps } from "react-native-bottomsheet";
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

const contentMap = new Map<ContentOptions, () => React.ReactElement>([
  [ContentOptions.Empty, EmptyContent],
  [ContentOptions.TextShort, ShortTextContent],
  [ContentOptions.TextLong, LongTextContent],
]);

export default function TestScreen() {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const openBottomSheet = () => bottomSheetRef.current?.open();
  const closeBottomSheet = () => bottomSheetRef.current?.close();
  const params = useGlobalSearchParams<{ props?: string }>();

  const { content: contentOption, ...bottomSheetProps }: BottomSheetProps & { content: ContentOptions } = useMemo(() => {
    if (!params.props) return {};

    const decodedProps = decodeURIComponent(params.props);
    const jsonProps = JSON.parse(decodedProps);

    return jsonProps;
  }, [params]);

  const Content = useMemo(() => {
    return contentMap.get(contentOption) || ShortTextContent;
  }, [contentOption]);

  useEffect(() => {
    console.log(`Loading bottomsheet with props:\n${JSON.stringify(bottomSheetProps, null, 2)}`);
  }, [bottomSheetProps]);

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
