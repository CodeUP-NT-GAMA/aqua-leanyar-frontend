import {View, Dimensions, FlatList, StyleSheet} from "react-native";
import {AppText} from "@/components/AppText";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";
import CheckoutForm from "@/components/CheckoutForm"
import StripeProvider from "@/components/StripeProvider";
import GeneralButton from "@/components/generic/GeneralButton";
import CartItem from "@/components/generic/CartItem";
import {CartService} from "@/service/CartService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, {Toast} from 'toastify-react-native'
import {useBadge} from "@/components/generic/CartContext";
import React, {useState, useEffect} from "react";
import {Card, Divider, Text, useTheme} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";


const {height, width} = Dimensions.get("window");

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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const {setCount} = useBadge();
    const router = useRouter();
    const styles = makeStyles(theme);


    const fetchCart = async () => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            const auth = JSON.parse(value);
            const response = await CartService.getCart(auth.token);
            setData(response.data.result.items);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart(); // Fetch first page on mount
    }, []);


    return (
        <AppBackground>
            <StripeProvider>
                <FlatList
                    data={data}
                    renderItem={({item}) => <CartItem item={item} theme={theme}/>}
                    keyExtractor={item => item.id}
                />
                {/*<View className="justify-center flex-1 p-4">*/}
                {/*    <AppText center>Third Screen</AppText>*/}
                {/*    <Button*/}
                {/*        title="Back"*/}
                {/*        theme="secondary"*/}
                {/*        onPress={() => {*/}
                {/*            router.back();*/}
                {/*        }}*/}
                {/*    />*/}

                {/*    <GeneralButton mode={"contained"} style={undefined} text={"Add to Cart"}*/}
                {/*                   onPressFunction={async () => {*/}
                {/*                       let items = await addToCart(1, 1);*/}
                {/*                       setCount(items);*/}
                {/*                   }}/>*/}
                {/*    <GeneralButton mode={"elevated"} style={undefined} text={"Remove from Cart"}*/}
                {/*                   onPressFunction={async () => {*/}
                {/*                       // perform remove cart logic*/}
                {/*                       setCount(0);*/}
                {/*                   }}/>*/}
                {/*    <ToastManager/>*/}
                {/*</View>*/}

                <CheckoutForm/>
            </StripeProvider>
        </AppBackground>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        gap: 12,
        width: width,
        alignContent: 'center',
        paddingBottom: height * 0.05
    }
});
