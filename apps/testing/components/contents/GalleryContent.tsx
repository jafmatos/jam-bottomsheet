import { FlatList, View } from "react-native";

export const GalleryContent = () => {
  const colors = ["red", "yellow", "blue", "purple", "green"];

  return (
    <FlatList
      testID="gallery-content"
      contentContainerStyle={{
        padding: 16,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={colors}
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{
              width: 16,
            }}
          />
        );
      }}
      renderItem={({ item, index }) => {
        return (
          <View
            testID={index === 0 ? "first-image" : index === colors.length - 1 ? "last-image" : ""}
            style={{ height: 200, width: 200, backgroundColor: item }}
          />
        );
      }}
    />
  );
};
