import {View} from "react-native";
import {AppText} from "@/components/AppText";
import {Link, useRouter} from "expo-router";
import {Button} from "@/components/Button";
import {useContext} from "react";
import {AuthContext} from "@/utils/authContext";

export default function IndexScreen() {
    const authState = useContext(AuthContext);
    const router = useRouter();
    const canGoBack = router.canGoBack();

    return (
        <View className="justify-center flex-1 p-4 ">
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
            <Button title="Log out!" onPress={authState.logOut}/>
        </View>


    );
}
