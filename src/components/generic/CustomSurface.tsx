import * as React from 'react';
import {Surface} from 'react-native-paper';
import {StyleSheet} from 'react-native';


export default function CustomSurface({children, mode, style, elevation, theme, ...props}) {
    return (
        <Surface
            style={[
                styles.surface,
                style,
            ]}
            elevation={elevation}
            mode={mode}
            theme={theme}
            {...props}
        >
            {children}
        </Surface>
    );
}

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

