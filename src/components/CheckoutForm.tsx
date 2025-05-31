import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralButton from "@/components/generic/GeneralButton";
import {CheckoutService} from "@/service/CheckoutService";
import {StyleSheet, Dimensions} from "react-native";

const {width} = Dimensions.get("window");

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
    return <GeneralButton onPressFunction={openPaymentModal} text="Proceed to Checkout" style={styles.checkout}
                          mode={"contained"}/>;
}

const styles = StyleSheet.create({
    checkout: {
        alignSelf: "center",
        width: width * 0.8,
    },
});