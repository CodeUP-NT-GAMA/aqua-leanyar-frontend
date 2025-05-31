import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import CheckoutForm from "@/components/CheckoutForm"
import StripeProvider from "@/components/StripeProvider";
import CartItem from "@/components/generic/CartItem";
import React from "react";
import {Text, useTheme} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";
import {useCart} from "@/components/generic/CartContext";
import {Image} from "expo-image";
import ToastManager from 'toastify-react-native'


const {height, width} = Dimensions.get("window");

export default function ThirdScreen() {
    const cartContext = useCart();

    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <AppBackground>
            {cartContext?.count == 0 && <View style={styles.empty_cart_view}>
                <Image cachePolicy={"disk"}
                       source={require("@assets/general/empty_cart.png")}
                       style={styles.empty_cart}
                       alt="empty_cart"
                       contentFit={"contain"}/>
                <Text variant="labelLarge" style={styles.empty_cart_text}>Well, well, well...</Text>
                <Text variant="labelLarge" style={styles.empty_cart_text2}>Look who's window shopping again!</Text>
            </View>}
            {cartContext?.count != 0 && <StripeProvider>
                <FlatList
                    data={cartContext?.items}
                    renderItem={({item}) => <CartItem item={item} theme={theme}
                                                      removeMethod={cartContext?.removeItem}/>}
                    keyExtractor={item => item.id}
                />

                <CheckoutForm/>
            </StripeProvider>
            }
            <ToastManager/>
        </AppBackground>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        gap: 12,
        width: width,
        alignContent: 'center',
        paddingBottom: height * 0.05
    },
    empty_cart_view: {
        flex: 1
    },
    empty_cart: {
        height: height * 0.5,
        opacity: 50

    },
    empty_cart_text: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: height * 0.03,
        color: theme.colors.error
    },
    empty_cart_text2: {
        fontSize: 20,
        alignSelf: 'center',
        color: theme.colors.error
    }

});
