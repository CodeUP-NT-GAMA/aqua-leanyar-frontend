import {View} from "react-native";
import {AppText} from "@/components/AppText";
import {Link, useRouter} from "expo-router";
import {Button} from "@/components/Button";

export default function SecondScreen() {
    const router = useRouter();

    return (
        <View className="justify-center flex-1 p-4">
            <AppText center>Second Screen</AppText>
            <Link href="/activity/nested" push asChild>
                <Button title="Push to /activity/nested"/>
            </Link>
            <Button
                title="Back"
                theme="secondary"
                onPress={() => {
                    router.back();
                }}
            />
        </View>
    );
}

/**
 * /index
 * /activity (stack)
 *   /activity/index
 *   /activity/nested
 *   /activity/also-nested
 * /third
 * /fourth
 */
