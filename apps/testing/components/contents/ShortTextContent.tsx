import { Text, View } from "react-native";

export default function ShortTextContent() {
  return (
    <View testID="short-text-content" style={{ padding: 16, gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>Jesus the Way to the Father</Text>

        <Text style={{ lineHeight: 22 }}>
          <Text style={{ fontWeight: "600" }}>5 </Text>
          Thomas said to him, “Lord, we don’t know where you are going, so how can we know the way?”
        </Text>

        <Text style={{ lineHeight: 22 }}>
          <Text style={{ fontWeight: "600" }}>6 </Text>
          Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.
          <Text style={{ fontWeight: "600" }}> 7 </Text>
          If you really know me, you will know my Father as well. From now on, you do know him and have seen him.”
        </Text>

        <Text style={{ lineHeight: 22 }}>
          <Text style={{ fontWeight: "600" }}>8 </Text>
          Philip said, “Lord, show us the Father and that will be enough for us.”
        </Text>

        <Text style={{ lineHeight: 22 }}>
          <Text style={{ fontWeight: "600" }}>9 </Text>
          Jesus answered: “Don’t you know me, Philip, even after I have been among you such a long time? Anyone who has seen me has seen the
          Father. How can you say, ‘Show us the Father’?
          <Text style={{ fontWeight: "600" }}> 10 </Text>
          Don’t you believe that I am in the Father, and that the Father is in me? The words I say to you I do not speak on my own
          authority. Rather, it is the Father, living in me, who is doing his work.
          <Text style={{ fontWeight: "600" }}> 11 </Text>
          Believe me when I say that I am in the Father and the Father is in me; or at least believe on the evidence of the works
          themselves.
        </Text>

        <Text style={{ lineHeight: 22 }}>
          <Text style={{ fontWeight: "600" }}>12 </Text>
          Very truly I tell you, whoever believes in me will do the works I have been doing, and they will do even greater things than
          these, because I am going to the Father.
          <Text style={{ fontWeight: "600" }}>13 </Text>
          And I will do whatever you ask in my name, so that the Father may be glorified in the Son.
          <Text style={{ fontWeight: "600" }}>14 </Text>
          You may ask me for anything in my name, and I will do it.
        </Text>
      </View>
    </View>
  );
}
