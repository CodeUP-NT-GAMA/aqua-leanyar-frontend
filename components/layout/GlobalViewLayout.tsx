import React from "react";
import { ImageBackground, View } from "react-native";

class BackgroundLayout extends React.Component<{ children: any }> {
  render() {
    let { children } = this.props;
    return (
      <ImageBackground
        source={require("../../assets/images/background.jpg")} // replace with your image
        resizeMode="cover"
        className="flex-1"
        imageStyle={{ opacity: 0.5 }}
      >
        <View className="flex-1 bg-black/30">{children}</View>
      </ImageBackground>
    );
  }
}

export default BackgroundLayout;
