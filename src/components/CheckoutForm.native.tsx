import {Alert, Dimensions, StyleSheet} from "react-native";
import * as Linking from "expo-linking";
import {useState} from "react";
import {useStripe} from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CheckoutService} from "@/service/CheckoutService";
import GeneralButton from "@/components/generic/GeneralButton";
import {useCart} from "@/components/generic/CartContext";


const {width, height} = Dimensions.get("window");

async function markCompleted() {
    const value = await AsyncStorage.getItem("auth-key");


    if (value !== null) {
        const auth = JSON.parse(value);
        let response = await CheckoutService.completeCheckout(auth.token);
        console.log(response.data);
        if (response.status === 200) {
            return true;
        }
    }
}


async function fetchPaymentSheetParams() {

    const value = await AsyncStorage.getItem("auth-key");

    if (value !== null) {
        const auth = JSON.parse(value);
        let response = await CheckoutService.createPaymentIntend(auth.token);

        return ({
            paymentIntent: response.data.paymentIntent,
            ephemeralKey: response.data.ephemeralKey,
            customer: response.data.customer
        });
    } else {
        return ({
            paymentIntent: '',
            ephemeralKey: '',
            customer: ''
        });
    }

}

export default function CheckoutScreen() {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = useState(false);
    const cartContext = useCart();


    const initializePaymentSheet = async () => {

        const sheet = await fetchPaymentSheetParams();
        const paymentIntent = sheet.paymentIntent;
        const ephemeralKey = sheet.ephemeralKey;
        const customer = sheet.customer;

        // Use Mock payment data: https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-test
        const {error} = await initPaymentSheet({
            merchantDisplayName: "AquaLeanyer",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            returnURL: Linking.createURL("stripe-redirect")
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        setLoading(true);
        await initializePaymentSheet();
        const {error} = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
            setLoading(false);
        } else {
            Alert.alert("Success", "Your order is confirmed!");
            await markCompleted();
            cartContext.setItems([]);
            cartContext.setCount(0)
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     initializePaymentSheet();
    // }, []);

    return (
        <GeneralButton onPressFunction={openPaymentSheet} text="Proceed to Checkout" style={styles.checkout}
                       mode={"contained"} disabled={loading}/>
    );
}

const styles = StyleSheet.create({
    checkout: {
        alignSelf: "center",
        width: width * 0.8,
    },
});