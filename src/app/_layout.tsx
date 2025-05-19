import {Stack} from "expo-router";

import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import "../../global.css";
import React from "react";
import {StatusBar} from "expo-status-bar";
import {AuthProvider} from "@/utils/authContext";

import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';

export default function RootLayout() {

    const colorScheme = useColorScheme();
    const {theme} = useMaterial3Theme();

    const paperTheme =
        colorScheme === 'dark'
            ? {...MD3DarkTheme, colors: theme.dark}
            : {...MD3LightTheme, colors: theme.light};

    return (
        <GluestackUIProvider mode="system">
            <PaperProvider theme={paperTheme}>
                <AuthProvider>
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
                </AuthProvider>
            </PaperProvider>
        </GluestackUIProvider>
    );
}
