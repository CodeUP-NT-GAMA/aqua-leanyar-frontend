import {View} from "react-native";
import {AppText} from "@/components/AppText";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";
import CheckoutForm from "@/components/CheckoutForm"
import StripeProvider from "@/components/StripeProvider";
import GeneralButton from "@/components/generic/GeneralButton";
import {CartService} from "@/service/CartService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, {Toast} from 'toastify-react-native'
import {useBadge} from "@/components/generic/CartContext";

async function addToCart(productId: number, quantity: number): Promise<number> {
    const value = await AsyncStorage.getItem("auth-key");
    let count = 0;
    if (value !== null) {
        const auth = JSON.parse(value);
        await CartService.addToCart(auth.token, productId, quantity)
            .catch((error: Error) => {
                Toast.error('Something is not right, try again!', 'bottom')
            })
            .then(response => {
                Toast.success('Item added to your cart!', 'bottom');
                // @ts-ignore
                count = response.data.result.items.length;
            });
    }

    return count;

}

export default function ThirdScreen() {
    const {setCount} = useBadge();
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
                <GeneralButton mode={"contained"} style={undefined} text={"Add to Cart"}
                               onPressFunction={async () => {
                                   let items = await addToCart(1, 1);
                                   setCount(items);
                               }}/>
                <GeneralButton mode={"elevated"} style={undefined} text={"Remove from Cart"}
                               onPressFunction={async () => {
                                   // perform remove cart logic
                                   setCount(0);
                               }}/>
                <ToastManager/>
            </View>
        </StripeProvider>
    );
}
