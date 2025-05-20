import {Stack} from "expo-router";

import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import "../../global.css";
import React from "react";
import {StatusBar} from "expo-status-bar";
import {AuthProvider} from "@/utils/authContext";

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

const customDarkTheme = {...MD3DarkTheme, colors: Colors.dark};
const customLightTheme = {...MD3LightTheme, colors: Colors.light};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {

    const colorScheme = useColorScheme();
    const {theme} = useMaterial3Theme();

    const paperTheme =
        colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

    return (
        <GluestackUIProvider mode="system">
            <PaperProvider theme={paperTheme}>
                <AuthProvider>
                    <ThemeProvider value={paperTheme}>
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
