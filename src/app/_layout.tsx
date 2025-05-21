import {Stack} from "expo-router";

import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import "../../global.css";
import React, {useEffect} from "react";
import {StatusBar} from "expo-status-bar";
import {AuthProvider} from "@/utils/authContext";
import AwesomeIcon from '@react-native-vector-icons/fontawesome';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {useColorScheme} from 'react-native';
import {adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {Colors} from "../constants/color";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";

import merge from "deepmerge";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const customDarkTheme = {...MD3DarkTheme, colors: Colors.dark};
const customLightTheme = {...MD3LightTheme, colors: Colors.light};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const {theme} = useMaterial3Theme();

    const [loaded, error] = useFonts({
        'Inter-Black': require('@assets/fonts/AutourOne-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    const customFont = {
        fontFamily: 'AutourOne-Regular', // Replace with your desired fonts family
        fontWeight: 'normal',
    };

    const paperTheme =
        colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

    const customizedFontTheme = {
        ...paperTheme,
        fonts: {
            regular: customFont,
            medium: customFont,
            light: customFont,
            thin: customFont,
            bodySmall: customFont,
            bodyMedium: customFont,
            bodyLarge: customFont,
            labelLarge: customFont,
            labelMedium: customFont,
            labelSmall: customFont,
            headlineSmall: customFont,
            heavy: customFont,
            heeader: customFont,
        }
    };

    // @ts-ignore
    return (
        <GluestackUIProvider mode="system">
            <PaperProvider settings={{
                icon: (props) => <AwesomeIcon {...props} />
            }}
                           theme={customizedFontTheme}>
                <AuthProvider>
                    <ThemeProvider value={customizedFontTheme}>
                        <StatusBar style="auto"/>
                        <Stack>
                            <Stack.Screen
                                name="(protected)"
                                options={{
                                    headerShown: false,
                                    animation: "none",
                                }}

                            />
                            <Stack.Screen
                                name="login"
                                options={{
                                    headerShown: false,
                                    animation: "none",
                                }}
                            />
                            <Stack.Screen
                                name="register"
                                options={{
                                    headerShown: false,
                                    animation: "none",
                                }}
                            />
                        </Stack>
                    </ThemeProvider>
                </AuthProvider>
            </PaperProvider>
        </GluestackUIProvider>
    );
}
