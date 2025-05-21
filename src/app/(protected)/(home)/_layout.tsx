import {Stack} from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Home",
                headerTitleStyle: {fontFamily: "AutourOne-Regular", fontWeight: "normal"}
            }}/>
            <Stack.Screen name="home-nested"
                          options={{title: "Home Nested", headerTitleStyle: {fontFamily: "AutourOne-Regular"}}}/>
        </Stack>
    );
}
