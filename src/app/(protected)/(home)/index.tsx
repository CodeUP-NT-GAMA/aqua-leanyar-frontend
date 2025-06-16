import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {Link, useRouter} from "expo-router";
import React, {useContext, useRef, useState} from "react";
import {AuthContext} from "@/utils/authContext";
import {Button, Card, Divider, Text, useTheme} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";
import GeneralButton from "@/components/generic/GeneralButton";
import CustomSurface from "@/components/generic/CustomSurface";
import CustomImageCarousal from "@/components/generic/CustomImageCarousal";
import PagerView from "react-native-pager-view";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import {useCart} from "@/components/generic/CartContext";
import ToastManager, {Toast} from 'toastify-react-native'
import {AnalyticService} from "@/service/AnalyticService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {height, width} = Dimensions.get("window");
const LeftSwimming = props => <FontAwesome name="person-swimming" size={35} color={props.color}/>
const LeftShopping = props => <FontAwesome name="basket-shopping" size={35} color={props.color}/>


export default function IndexScreen() {
    const router = useRouter();
    const canGoBack = router.canGoBack();
    const authState = useContext(AuthContext);
    const theme = useTheme();
    const styles = makeStyles(theme);
    const pagerRef = useRef<PagerView>(null);
    const [page, setPage] = useState(0);
    const pages = [
        require('@assets/general/slider/slider-1.jpg'),
        require('@assets/general/slider/slider-2.jpg'),
        require('@assets/general/slider/slider-3.jpg'),
        require('@assets/general/slider/slider-4.jpg'),
        require('@assets/general/slider/slider-5.jpg')
    ];
    const cartContext = useCart();

    const swimming = () => LeftSwimming({color: theme.colors.primary})
    const shopping = () => LeftShopping({color: theme.colors.primary})

    let dummy_product = {
        product_id: 1,
        product_name: "Test Product",
        product_price: 11.24,
        quantity: 1,
        ProductType: {
            description: "Swim wear",
            id: 1,
            icon: "string",
            createdAt: "string",
            updatedAt: "string"
        },
        type: "",
        createdAt: "string",
        updatedAt: "string",
        ProductTypeId: 1,
        ProductMedia: []
    }

    return (
        <AppBackground>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={styles.container}
                        contentContainerStyle={styles.container}>
                <View style={[styles.column_style]}>

                    <View>
                        <CustomSurface elevation={5} theme={theme} mode={"elevated"} style={styles.surface}>
                            <CustomImageCarousal initialPage={0} pages={pages} style={styles.image_slider} theme={theme}
                                                 delay={3000} pagerRef={pagerRef} page={page} setPage={setPage}/>
                        </CustomSurface>
                    </View>

                    <View>
                        <Card style={styles.activity_card}>
                            <Card.Title title="Ready to get wet?" subtitle="Let's Go!" left={swimming}
                                        titleStyle={styles.card_title}/>
                            <Divider bold={true}/>
                            <Card.Cover source={require('@assets/general/media/cover-1.jpeg')}/>
                            <Card.Content>
                                <Text variant="bodyMedium" style={styles.card_content}>From a puddle of water to giant
                                    waves, we have got them all!</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button mode={"contained"}>Tell me more!</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                    <View>
                        <Card style={styles.shop_card}>
                            <Card.Title title="Fancy some merch?" subtitle="All you need to jump right in!"
                                        left={shopping}
                                        titleStyle={styles.card_title}/>
                            <Divider bold={true}/>
                            <Card.Cover source={require('@assets/general/media/cover-2.jpg')}/>
                            <Card.Actions>
                                <Button mode={"contained"} onPress={() => {
                                    router.replace("/(protected)/(shop)")
                                }}>Take me to the store!</Button>
                            </Card.Actions>
                        </Card>
                    </View>

                    <View>
                        <Link href="/home-nested" push asChild>
                            <GeneralButton mode="contained" onPressFunction={() => {
                                // @ts-ignore
                                router.push("home-nested")
                            }} text={"Push to nested"} style={{}}/>
                        </Link>
                        {canGoBack ? (
                            <GeneralButton
                                text={"Back"}
                                onPressFunction={() => {
                                    router.back();
                                }}
                                mode="contained"
                                style={{}}
                            />
                        ) : null}

                        <GeneralButton mode={"contained"} style={undefined} text={"Add to Cart"}
                                       onPressFunction={async () => {
                                           cartContext?.addToCart(1, 1);
                                           const value = await AsyncStorage.getItem("auth-key");
                                           // @ts-ignore
                                           const auth = JSON.parse(value);
                                           const token = auth.token;
                                           await AnalyticService.addToCartEvent(token, dummy_product)
                                               .catch((error: Error) => {
                                                   console.log(error)
                                               })
                                               .then(() => {
                                                   Toast.success('Item added to your cart!', 'bottom');
                                               });
                                       }}/>
                    </View>
                </View>
                <ToastManager/>
            </ScrollView>
        </AppBackground>

    );
}

const makeStyles = (theme) => StyleSheet.create({
    surface: {
        height: height * 0.3,
        width: "100%",
        borderRadius: 20
    },
    image_slider: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        width: width,
        alignContent: 'center',
        paddingBottom: height * 0.05
    },
    column_style: {
        flexWrap: "nowrap",
        padding: width * 0.03,
        alignItems: "stretch",
        gap: 10,

    },
    card_title: {
        fontSize: 20,
        fontWeight: "300",
    },
    card_content: {
        fontSize: 15,
        paddingTop: 10,
    },
    activity_card: {
        backgroundColor: theme.colors.secondaryContainer,
    },
    shop_card: {
        backgroundColor: theme.colors.tertiaryContainer,
    }
});