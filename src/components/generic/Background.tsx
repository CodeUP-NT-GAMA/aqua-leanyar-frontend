import React from "react";
import {KeyboardAvoidingView, Platform, StyleSheet, useColorScheme} from "react-native";
import {useTheme} from "react-native-paper";
import {ImageBackground} from "expo-image";

// @ts-ignore
export default function Background({children}) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const colorScheme = useColorScheme();

    if (colorScheme === 'dark') {
        return (
            <ImageBackground
                source={Platform.OS === 'web' ? require("@assets/general/background/Background-dark-web.png") :
                    require("@assets/general/background/Background-dark-native.png")}
                imageStyle={{opacity: 0.9}}
                style={styles.background}
            >
                <KeyboardAvoidingView style={styles.container} behavior="height">
                    {children}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    } else {
        return (
            <ImageBackground
                source={Platform.OS === 'web' ? require("@assets/general/background/Background-web.png") :
                    require("@assets/general/background/Background-native.png")}
                imageStyle={{opacity: 0.3}}
                style={styles.background}
            >
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {children}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }


}

const makeStyles = (theme) => StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        opacity: 80,
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