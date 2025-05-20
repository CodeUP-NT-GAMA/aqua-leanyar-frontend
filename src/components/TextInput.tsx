import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {TextInput as Input, useTheme} from "react-native-paper";

// @ts-ignore
export default function TextInput({errorText, description, ...props}) {
    const theme = useTheme();

    // Create styles using the current theme
    const styles = makeStyles(theme);
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 10,
    },
    input: {
        fontSize: 16,
        backgroundColor: theme.colors.surface,
    },
    description: {
        fontSize: 16,
        color: theme.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 16,
        color: theme.colors.error,
        paddingTop: 8,
    },
});