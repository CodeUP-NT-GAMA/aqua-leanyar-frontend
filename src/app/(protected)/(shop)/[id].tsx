import { Dimensions, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppBackground from "@/components/generic/AppBackground";
import { ProductService } from "@/service/ProductService";
import { theme } from "@/theme/theme";
import GeneralButton from "@/components/generic/GeneralButton";
import {useCart} from "@/components/generic/CartContext";
import ToastManager, {Toast} from 'toastify-react-native'
import ProductImageSection from "@/components/product/ProductImageSection";
import ProductInfoSection from "@/components/product/ProductInfoSection";
import { AnalyticService } from "@/service/AnalyticService";

const { height, width } = Dimensions.get("window");

export default function ProductDetailScreen() {
    const cartContext = useCart();
    const { id, title } = useLocalSearchParams();
    const navigation = useNavigation();
    const [data, setData] = useState<any>({});
    const styles = makeStyles(theme);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('M');
    const [color, setColor] = useState('Midnight Black');

    const fetchProduct = async (id) => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            const auth = value ? JSON.parse(value) : null;
            const response = await ProductService.getProduct(auth.token, id);

            if (response.status === 200) {
                setData(response.data.result);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            Toast.error('Quantity cannot be less than 1', 'bottom');
            return;
        }
        setQuantity(newQuantity);
    };

    const handleSizeChange = (size) => {
        setSize(size);
    }
    const handleColorChange = (color) => {
        setColor(color);
    }

    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerTitleStyle: {
                fontFamily: "AutourOne-Regular",
                fontSize: 18,
                fontWeight: '700'
            },
            headerStyle: {
                backgroundColor: '#ffffff',
                elevation: 0,
                shadowOpacity: 0,
            }
        });

        fetchProduct(id);
    }, [id]);

    return (
        <AppBackground>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.container}>
                    <ProductImageSection data={data}  />

                    {/* Product Info Section */}
                    <ProductInfoSection 
                    data={data} 
                    onQuantityUpdate = { handleQuantityChange }
                    onColorUpdate = { handleColorChange }
                    onSizeUpdate = { handleSizeChange }/>
                    

                    {/* Action Buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <GeneralButton mode={"contained"} style={undefined} text={"Add to Cart"}
                            onPressFunction={async () => {

                                cartContext?.addToCart(data?.data?.product_id, quantity);
                                const value = await AsyncStorage.getItem("auth-key");
                                const auth = value ? JSON.parse(value) : null;
                                const token = auth.token;
                                Toast.success('Item added to your cart!', 'bottom');
                                console.log("Adding to cart", color, size, quantity);
                                AnalyticService.addToCartEvent(token, data?.data)
                                    .catch((error: Error) => {
                                        console.log(error)
                                    })
                                    .then(() => {
                                        Toast.success('Item added to your cart!', 'bottom');
                                    });
                            }} />
                    </View>
                </View>
                <ToastManager/>
            </ScrollView>
        </AppBackground>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    actionButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.background,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    addToCartButton: {
        marginBottom: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    buyNowButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    gradientButton: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addToCartText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    buyNowText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
});