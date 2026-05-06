import { Button, Text, TextInput, View } from "react-native";

export function FormContent() {
  return (
    <View
      style={{
        padding: 16,
        display: "flex",
        gap: 16,
      }}
    >
      <View
        testID="form_header"
        style={{
          display: "flex",
          gap: 4,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 600 }} testID="form_title">
          Feedback
        </Text>
        <Text testID="form_description">Found something confusing, broken, or just annoying? Tell me what happened.</Text>
      </View>

      <TextInput
        testID="form-input_description"
        placeholder="What were you trying to do? What went wrong?"
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: "#ccc",
        }}
      />

      <Button testID="form_submit-button" title="Send feedback" />
    </View>
  );
}
