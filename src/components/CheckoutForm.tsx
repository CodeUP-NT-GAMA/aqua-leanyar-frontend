import {useRouter} from "expo-router";
import CheckoutButton from "@/components/CheckoutButton";

async function openPaymentModal(): Promise<void> {
    //TODO Change this to axios & include auth header or it will not work!
    const {url} = await fetch("http://192.168.1.46:3000/checkout/hosted", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            custom_donation: "12.56",
        },
    }).then((res) => res.json());

    const router = useRouter();
    console.log(url);
    router.push(url);
}

export default function CheckoutForm() {
    return <CheckoutButton onPress={openPaymentModal} title="Checkout"/>;
}