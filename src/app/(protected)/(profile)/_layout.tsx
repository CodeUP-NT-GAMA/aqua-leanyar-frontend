import {Stack} from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: "Proflie", headerShown: false}}/>
            <Stack.Screen name="purchase_history" options={{title: "Purchase History", headerShown: true}}/>
        </Stack>
    );
}
