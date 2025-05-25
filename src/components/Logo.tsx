import React from "react";
import {StyleSheet} from "react-native";
import {Image} from "expo-image"

export default function Logo() {
    return (
        <Image
            source={require("../../assets/logo.png")}
            cachePolicy={"disk"}
            style={styles.image}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        marginBottom: 3,
    },
});