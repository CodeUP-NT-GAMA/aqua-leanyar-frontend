import {Stack} from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: "Profile", headerShown: false}}/>
            <Stack.Screen name="purchase_history" options={{
                title: "Purchase History", headerShown: true,
                headerTitleStyle: {fontFamily: "Inter-Black", fontWeight: "normal"}
            }}/>
            <Stack.Screen name="reciept" options={{
                title: "Purchase Order", headerShown: false,
                headerTitleStyle: {fontFamily: "Inter-Black", fontWeight: "normal"}
            }}/>
        </Stack>
    );
}
