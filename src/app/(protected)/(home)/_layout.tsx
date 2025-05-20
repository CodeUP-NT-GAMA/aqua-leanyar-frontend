import {Stack} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StatusBar, StyleSheet} from "react-native";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Stack>
                    <Stack.Screen name="index" options={{title: "Home"}}/>
                    <Stack.Screen name="home-nested" options={{title: "Home Nested"}}/>
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    pagerView: {
        height: "100%",
    },
});
