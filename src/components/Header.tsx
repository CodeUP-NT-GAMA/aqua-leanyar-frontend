import React from "react";
import {StyleSheet} from "react-native";
import {Text, useTheme} from "react-native-paper";


export default function Header(props) {
    let theme = useTheme();
    let styles = makeStyles(theme);
    return <Text style={styles.header} {...props} />;
}

const makeStyles = (theme) => StyleSheet.create({
    header: {
        fontSize: 18,
        color: theme.colors.primary,
        fontWeight: "bold",
        paddingVertical: 12,
        fontFamily: 'Inter-Black'
    },
});