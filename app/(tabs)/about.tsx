import { StyleSheet, Text, View } from "react-native";
import GlobalViewLayout from "@/components/layout/GlobalViewLayout";

export default function AboutScreen() {
  return (
    <GlobalViewLayout>
      <View style={styles.container}>
        <Text style={styles.text}>About Screen TEst Update screen</Text>
      </View>
    </GlobalViewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
