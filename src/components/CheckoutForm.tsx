import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckoutButton from "@/components/CheckoutButton";
import {CheckoutService} from "@/service/CheckoutService";

async function openPaymentModal(): Promise<void> {

    const value = await AsyncStorage.getItem("auth-key");
    if (value !== null) {
        const auth = JSON.parse(value);

        const response = await CheckoutService.createHostedSession(auth.token)

        const router = useRouter();
        // @ts-ignore
        router.push(response.data.url);

    }

}

export default function CheckoutForm() {
    return <CheckoutButton onPress={openPaymentModal} title="Checkout"/>;
}