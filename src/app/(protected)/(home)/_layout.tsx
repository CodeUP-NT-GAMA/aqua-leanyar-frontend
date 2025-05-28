import {Stack} from "expo-router";
import React from "react";

export default function Layout() {


    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "AquaLeanyer",
                headerTitleStyle: {fontFamily: "AutourOne-Regular", fontWeight: "normal"}
            }}/>
            <Stack.Screen name="home-nested"
                          options={{title: "Home Nested", headerTitleStyle: {fontFamily: "AutourOne-Regular"}}}/>
        </Stack>
    );
}
