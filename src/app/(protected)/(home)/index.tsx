import {Image, StyleSheet, View, Linking} from "react-native";
import {AppText} from "@/components/AppText";
import {Link, useRouter} from "expo-router";
import {Button} from "@/components/Button";
import {useContext} from "react";
import {AuthContext} from "@/utils/authContext";
import {useTheme} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";
import GeneralButton from "@/components/generic/GeneralButton";


export default function IndexScreen() {
    const router = useRouter();
    const canGoBack = router.canGoBack();
    const authState = useContext(AuthContext);
    const theme = useTheme();

    return (
        <AppBackground>
            <View className="justify-center flex-1 p-4 ">


                <AppText center>Index Screen</AppText>
                <Link href="/home-nested" push asChild>
                    <GeneralButton mode="contained" onPressFunction={() => {
                        router.push("home-nested")
                    }} text={"Push to nested"} style={{}}/>
                </Link>
                {canGoBack ? (
                    <GeneralButton
                        text={"Back"}
                        onPressFunction={() => {
                            router.back();
                        }}
                        mode="contained"
                        style={{}}
                    />
                ) : null}
                <GeneralButton mode="contained" text="Log out!" onPressFunction={authState.logOut}
                               style={{backgroundColor: theme.colors.primary}}/>
            </View>
        </AppBackground>

    );
}