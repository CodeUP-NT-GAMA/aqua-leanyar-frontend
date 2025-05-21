import {View} from "react-native";
import {AppText} from "@/components/AppText";
import {Link, useRouter} from "expo-router";
import {Button} from "@/components/Button";
import {useContext} from "react";
import {AuthContext} from "@/utils/authContext";
import {Card} from "@/components/ui/card";
import {useTheme} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";


export default function IndexScreen() {
    const router = useRouter();
    const canGoBack = router.canGoBack();
    const authState = useContext(AuthContext);
    const theme = useTheme();

    return (
        <AppBackground>
            <View className="justify-center flex-1 p-4 ">
                <Card size="lg" variant="elevated" className="m-3">
                    <AppText center>
                        Quick Start
                    </AppText>
                    <AppText center>Start building your next project in minutes</AppText>
                </Card>

                <AppText center>Index` Screen</AppText>
                <Link href="/home-nested" push asChild>
                    <Button title="Push to /home-nested"/>
                </Link>
                {canGoBack ? (
                    <Button
                        title="Back"
                        theme="primary"
                        onPress={() => {
                            router.back();
                        }}
                    />
                ) : null}
                <Button title="Log out!" onPress={authState.logOut} style={{backgroundColor: theme.colors.primary}}/>
            </View>
        </AppBackground>


    );
}
