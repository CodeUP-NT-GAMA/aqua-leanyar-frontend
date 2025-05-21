import React from "react";
import {ImageBackground, Platform, StyleSheet, useColorScheme, View} from "react-native";
import {useTheme} from "react-native-paper";

// @ts-ignore
export default function AppBackground({children}) {
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
                <View style={styles.container}>
                    {children}
                </View>
            </ImageBackground>
        );
    } else {
        return (
            <ImageBackground
                source={Platform.OS === 'web' ? require("@assets/general/background/Background-web.png") :
                    require("@assets/general/background/Background-native.png")}
                imageStyle={{opacity: 0.5}}
                style={styles.background}
            >
                <View style={styles.container}>
                    {children}
                </View>
            </ImageBackground>
        );
    }


}

const makeStyles = (theme) => StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});