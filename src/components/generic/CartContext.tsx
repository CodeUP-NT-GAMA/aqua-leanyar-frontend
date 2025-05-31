import React, {createContext, useContext, useEffect, useState} from 'react';
import {CartService} from "@/service/CartService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartContextType = {
    count: number;
    setCount: (count: number) => void;
    items: any;
    setItems: (items: any[]) => void;
    addToCart: (product: number, quantity: number) => void;
    removeItem: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
    count: 0,
    setCount: function (count: number): void {
        throw new Error('Function not implemented.');
    },
    items: undefined,
    setItems: function (items: any[]): void {
        throw new Error('Function not implemented.');
    },
    addToCart: function (product: number, quantity: number): void {
        throw new Error('Function not implemented.');
    },
    removeItem: function (id: number): void {
        throw new Error('Function not implemented.');
    }
});

export const CartProvider = ({children}: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([{}]);

    const fetchCartItemCount = async () => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await CartService.getCartItemCount(auth.token);
            setCount(response ?? 0);

        } catch (error) {
            console.error('Error fetching cart item count:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            let cartResponse = await CartService.getCart(auth.token);
            setItems(cartResponse.data.result.items)
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const removeItem = async (id: number) => {
        const value = await AsyncStorage.getItem("auth-key");
        // @ts-ignore
        const auth = JSON.parse(value);
        // @ts-ignore
        let newItems = await removeItemRequest(id, auth.token);
        setItems(newItems);
        setCount(newItems?.length ?? 0);
    };

    const addToCart = async (productId: number, quantity: number) => {
        const value = await AsyncStorage.getItem("auth-key");
        if (value !== null) {
            const auth = JSON.parse(value);
            await CartService.addToCart(auth.token, productId, quantity)
                .catch((error: Error) => {
                    console.error(error);
                })
                .then(response => {

                    // @ts-ignore
                    setItems(response?.data.result.items)
                    setCount(response?.data.result.items.length ?? 0);
                });
        }
    }

    useEffect(() => {
        fetchCartItemCount()
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{count, setCount, items, setItems, removeItem, addToCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

const removeItemRequest = async (itemId: number, token: string) => {
    try {
        const response = await CartService.removeCartItem(token, itemId);
        return response.data.result.items;
    } catch (error) {
        console.log(error);
        return [];
    }
}