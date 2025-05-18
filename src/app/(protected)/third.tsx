import {View} from "react-native";
import {AppText} from "@/components/AppText";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";
import CheckoutForm from "@/components/CheckoutForm"
import StripeProvider from "@/components/StripeProvider";

export default function ThirdScreen() {
    const router = useRouter();

    return (
        <StripeProvider>
        <View className="justify-center flex-1 p-4">
            <AppText center>Third Screen</AppText>
            <Button
                title="Back"
                theme="secondary"
                onPress={() => {
                    router.back();
                }}
            />
            <CheckoutForm/>
        </View>
        </StripeProvider>
    );
}
