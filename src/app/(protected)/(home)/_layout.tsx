import {Stack} from "expo-router";
import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CartService} from "@/service/CartService";
import {useBadge} from "@/components/generic/CartContext";

export default function Layout() {
    const {count, setCount} = useBadge();


    const fetchCartItemCount = async () => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            const auth = JSON.parse(value);
            const response = await CartService.getCartItemCount(auth.token);
            setCount(response ?? 0);

        } catch (error) {
            console.error('Error fetching cart item count:', error);
        }
    };

    useEffect(() => {
        fetchCartItemCount(); // Fetch first page on mount
    }, []);


    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "AquaLeanyer",
                headerTitleStyle: {fontFamily: "AutourOne-Regular", fontWeight: "normal"}
            }}/>
            <Stack.Screen name="home-nested"
                          options={{title: "Home Nested", headerTitleStyle: {fontFamily: "AutourOne-Regular"}}}/>
        </Stack>
    );
}
