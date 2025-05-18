import React from "react";
import {ImageBackground, KeyboardAvoidingView, StyleSheet,} from "react-native";

import {theme} from "@/theme/theme";

// @ts-ignore
export default function Background({children}) {
    return (
        <ImageBackground
            source={require("../../assets/landing.png")}


            style={styles.background}
        >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});