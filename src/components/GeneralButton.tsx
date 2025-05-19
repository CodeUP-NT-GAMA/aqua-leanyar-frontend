import React from "react";
import {StyleSheet} from "react-native";

import {theme} from "@/theme/theme";
import {Button as PaperButton} from "react-native-paper";


// @ts-ignore
export default function Button({mode, style, text, onPressFunction}) {
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
    },
    text: {
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 26,
    },
});