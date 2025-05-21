import React from "react";
import {StyleSheet} from "react-native";
import {Button as PaperButton, useTheme} from 'react-native-paper';


export default function Button({mode, style, text, onPressFunction}) {
    const theme = useTheme();
    // @ts-ignore
    return (
        <PaperButton
            style={[
                styles.button,
                mode === "outlined" && {backgroundColor: theme.colors.surface},
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            onPress={onPressFunction}
        >
            {text}
        </PaperButton>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        marginVertical: 10,
        paddingVertical: 2,
        fontSize: 18
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 26,
    },
});