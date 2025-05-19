import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                animation: "none",
            }}
        >
            <Stack.Screen name="index" options={{title: "Shop", headerShown:false}}/>
            <Stack.Screen name="product-nested" options={{title: "Shop Nested"}}/>
            <Stack.Screen
                name="also-nested"
                options={{title: "Shop Also Nested"}}
            />
        </Stack>
    );
}