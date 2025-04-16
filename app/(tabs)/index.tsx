import { StyleSheet, View } from "react-native";

import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import GlobalViewLayout from "@/components/layout/GlobalViewLayout";

const PlaceholderImage = require("@/assets/images/logo-3.png");

export default function Index() {
  return (
    <GlobalViewLayout>
      <View style={styles.container} className="container">
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} />
        </View>
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" />
          <Button label="Use this photo" />
        </View>
      </View>
    </GlobalViewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
