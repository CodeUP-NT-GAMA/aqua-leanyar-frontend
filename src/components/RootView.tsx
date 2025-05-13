// RootView.tsx
import React, {ReactNode} from 'react';
import {ImageBackground, ImageSourcePropType, StatusBar, StyleSheet, View, ViewStyle} from 'react-native';

interface RootViewProps {
    children: ReactNode;
    backgroundImage?: ImageSourcePropType;
    backgroundColor?: string;
    statusBarColor?: string;
    barStyle?: 'default' | 'light-content' | 'dark-content';
    style?: ViewStyle;
}

const RootView: React.FC<RootViewProps> = ({
                                               children,
                                               backgroundImage,
                                               backgroundColor = '#f0f0f0',
                                               statusBarColor = '#f0f0f0',
                                               barStyle = 'dark-content',
                                               style,
                                           }) => {
    return (
        <ImageBackground
            source={backgroundImage || require('../../assets/landing.png')}
            style={[styles.container, style, {backgroundColor}]}
            resizeMode="cover"
        >
            <StatusBar backgroundColor={statusBarColor} barStyle={barStyle}/>
            <View style={styles.overlay}>
                {children}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: StatusBar.currentHeight || 0,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // Optional overlay for better text readability
    },
});

export default RootView;