import * as React from 'react';
import {View, Dimensions, StyleSheet} from "react-native";
import {Text, Divider, Surface} from "react-native-paper";
import {FileService} from "@/service/FileService"
import {Image} from "expo-image";
import GeneralButton from "@/components/generic/GeneralButton";

const {height, width} = Dimensions.get("window");

export default function CartItem({item, theme}) {

    return (
        <View
            style={[
                styles.container
            ]}
        >

            <Surface style={styles.surface} elevation={5}>
                <Image source={{
                    uri: FileService.buildURI(item.Product.ProductMedia[0].MediaId)
                }}
                       style={styles.image}
                       cachePolicy={"disk"}
                />
                <View style={styles.detail}>
                    <Text style={styles.product_name}>{item.Product.product_name}</Text>
                    <Divider/>
                    <Text style={styles.item_detail}>{item.quantity} Units @ {item.Product.product_price} Per Unit
                        = {item.quantity * item.Product.product_price} AUD</Text>
                    <GeneralButton mode={"elevated"} style={undefined} text={"Remove"}
                                   onPressFunction={async () => {
                                       // perform remove cart logic
                                   }}/>
                </View>

            </Surface>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'

    },
    surface: {
        marginTop: 15,
        padding: 10,
        width: width * 0.95,
        borderRadius: 20,
        flexDirection: 'row',
    },
    image: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 20
    },
    product_name: {
        padding: 15,
        fontSize: 18,
        fontFamily: 'Inter-Black'
    },
    detail: {
        padding: 8,
        width: width * 0.65
    },
    item_detail: {
        fontFamily: 'Inter-Black',
        fontSize: 12,
        paddingTop: 10,
        paddingLeft: 10
    }

});

