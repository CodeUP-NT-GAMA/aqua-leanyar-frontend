import {Stack, usePathname} from "expo-router";

export default function Layout() {
    const pathname = usePathname();

    return (
        <Stack
            screenOptions={{
                animation: pathname.startsWith("/activity") ? "default" : "none",
            }}
        >
            <Stack.Screen name="index"
                          options={{title: "Activities", headerTitleStyle: {fontFamily: "AutourOne-Regular"}}}/>
            <Stack.Screen name="nested"
                          options={{title: "Second Nested", headerTitleStyle: {fontFamily: "AutourOne-Regular"}}}/>
            <Stack.Screen
                name="also-nested"
                options={{title: "Second Also Nested"}}
            />
        </Stack>
    );
}
