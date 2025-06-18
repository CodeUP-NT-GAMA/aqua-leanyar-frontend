import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import AppBackground from "@/components/generic/AppBackground";
import {Divider, Surface, Text, useTheme} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {History, PurchaseHistoryService, PurchaseItem} from "@/service/PurchaseHistoryService";
import {useLocalSearchParams, useNavigation} from "expo-router";
import {Image} from "expo-image";
import {FileService} from "@/service/FileService";

const {width, height} = Dimensions.get("window");

function calculateTotal(PurchaseItems: PurchaseItem[]) {
    let total = 0;

    if (PurchaseItems?.length > 0) {
        PurchaseItems.forEach(item => {
            total += item.qty * item.unit_price;
        });
    }

    return total;
}

function trimDate(date: string) {
    return date?.substring(0, 10);
}

const PurchaseReceipt: React.FC = () => {
    const {id, title} = useLocalSearchParams();
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [data, setData] = React.useState<History>({});
    const [loading, setLoading] = React.useState(true);

    const fetchPurchaseOrder = async () => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await PurchaseHistoryService.getPurchaseById(auth.token, Number(id));
            setData(response.data.result as unknown as History);
        } catch (error) {
            console.error('Error fetching receipt:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        navigation.setOptions(
            {
                title: 'Receipt',
                headerTitleStyle: {
                    fontFamily: "AutourOne-Regular"
                }
            }
        );
        fetchPurchaseOrder(); // Fetch first page on mount
    }, []);

    const renderHeader = () => {
        return (
            <View style={styles.container}>

                <Surface elevation={5} style={styles.surface}>
                    <View style={{width: "70%"}}>
                        <Text style={styles.bill_text}>Receipt #:{title}</Text>
                        <Text style={styles.bill_text}>Date: {trimDate(data.createdAt)}</Text>
                        <Text style={styles.bill_text}>Total: {calculateTotal(data.PurchaseItems)} AUD</Text>
                        <Text style={styles.bill_info_text}>Please collect your items at check-in counter & retain
                            physical receipt.</Text>
                    </View>
                    {
                        data.order_status == "PROCESSING_PAYMENT" &&
                        <Image
                            source={require("@assets/general/processing.png")}
                            cachePolicy={"disk"}
                            style={styles.image}
                        />
                    }
                    {
                        data.order_status == "PAID" &&
                        <Image
                            source={require("@assets/general/paid.png")}
                            cachePolicy={"disk"}
                            style={styles.image}
                        />
                    }

                </Surface>
            </View>
        );
    }


    const renderItem = ({item}: PurchaseItem) => {

        return (
            <View
                style={[
                    styles.container
                ]}
            >

                <Surface style={styles.surface} elevation={5}>
                    <Image source={{
                        uri: FileService.buildURI(item.media_image)
                    }}
                           style={styles.image}
                           cachePolicy={"disk"}
                    />
                    <View style={styles.detail}>
                        <Text style={styles.product_name}>{item.product_name}</Text>
                        <Divider/>
                        <Text style={styles.item_detail}>{item.qty} Units @ {item.unit_price} Per Unit
                            = {item.qty * item.unit_price} AUD</Text>
                    </View>

                </Surface>


            </View>
        )
    };


    return (
        <AppBackground>
            <View style={styles.full_view}>
                <FlatList
                    style={{
                        alignSelf: "center",
                        width: width * 0.9,
                        paddingBottom: height * 0.1,
                    }}
                    data={data.PurchaseItems}
                    keyExtractor={(item, index) => item.id}
                    numColumns={1}
                    horizontal={false}
                    contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderHeader}
                    renderItem={renderItem}
                />
            </View>
        </AppBackground>
    );
};

const makeStyles = (theme) => StyleSheet.create({
    full_view: {
        width: width * 0.95,
        height: height,
        alignSelf: "center",
    },
    container: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'

    },
    surface: {
        marginTop: 15,
        padding: 10,
        width: width * 0.9,
        borderRadius: 20,
        flexDirection: 'row',
    },
    image: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 20
    },
    bill_text: {
        fontSize: 15,
        fontFamily: 'Inter-Black'
    },
    bill_info_text: {
        padding: 5,
        fontSize: 15,
        color: theme.colors.error,
        fontFamily: 'Inter-Black'
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

export default PurchaseReceipt;
