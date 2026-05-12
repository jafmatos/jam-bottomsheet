import { useMemo, useState } from "react";
import { Button, Text, View } from "react-native";
import { BottomSheet, BottomSheetProps } from "jam-bottomsheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalSearchParams } from "expo-router";
import EmptyContent from "@/components/contents/EmptyContent";
import ShortTextContent from "@/components/contents/ShortTextContent";
import LongTextContent from "@/components/contents/LongTextContent";
import { FormContent } from "@/components/contents/FormContent";
import { GalleryContent } from "@/components/contents/GalleryContent";

enum ContentOptions {
  Empty = "empty",
  TextShort = "text:short",
  TextLong = "text:long",
  Form = "form",
  Gallery = "gallery",
}

const contentMap = new Map<ContentOptions, () => React.ReactElement>([
  [ContentOptions.Empty, EmptyContent],
  [ContentOptions.TextShort, ShortTextContent],
  [ContentOptions.TextLong, LongTextContent],
  [ContentOptions.Form, FormContent],
  [ContentOptions.Gallery, GalleryContent],
]);

export default function TestScreen() {
  const insets = useSafeAreaInsets();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const openBottomSheet = () => setIsBottomSheetOpen(true);
  const closeBottomSheet = () => setIsBottomSheetOpen(false);
  const params = useGlobalSearchParams<{ props?: string }>();

  const { content: contentOption, ...bottomSheetProps }: BottomSheetProps & { content: ContentOptions } = useMemo(() => {
    if (!params.props) return {};

    const decodedProps = decodeURIComponent(params.props);
    const jsonProps = JSON.parse(decodedProps);

    return jsonProps;
  }, [params]);

  const Content = useMemo(() => {
    return contentMap.get(contentOption) || EmptyContent;
  }, [contentOption]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          padding: 16,
          display: "flex",
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          Actions
        </Text>

        <Button testID="button_open-sheet" title="Open sheet" onPress={openBottomSheet} />
        <Button testID="button_close-sheet" title="Close sheet" onPress={closeBottomSheet} />
      </View>

      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} {...bottomSheetProps}>
        <Content />
      </BottomSheet>
    </View>
  );
}
