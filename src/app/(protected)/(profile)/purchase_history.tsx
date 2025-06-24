import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import AppBackground from "@/components/generic/AppBackground";
import {Card, Divider, Text, useTheme} from "react-native-paper";
import {Image} from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {History, PurchaseHistoryService, PurchaseItem} from "@/service/PurchaseHistoryService";
import GeneralButton from "@/components/generic/GeneralButton";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import {router} from "expo-router";

const {width, height} = Dimensions.get("window");

const PurchaseHistory: React.FC = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [data, setData] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);

    function trimDate(date: string) {
        return date?.substring(0, 10);
    }

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const fetchHistory = async (pageNumber = 1, pageSize = 12) => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await PurchaseHistoryService.getPurchases(auth.token, pageNumber, pageSize);
            if (!response.data.result.pagination.next_page) {
                setHasMore(false);
            }
            // @ts-ignore
            setData(prev => [...prev, ...response.data.result.data]);
            setPage(response.data.result.pagination.current_page);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            fetchHistory(page + 1, 12);
        }
    };

    React.useEffect(() => {
        fetchHistory(); // Fetch first page on mount
    }, []);

    const generateIcon = (icon: string) => {
        return (<FontAwesome name={icon} size={35} color={theme.colors.primary}/>)
    }


    const renderHistory = ({item}: History) => {

        function calculateTotal(PurchaseItems: PurchaseItem[]) {
            let total = 0;

            PurchaseItems.forEach(item => {
                total += item.qty * item.unit_price;
            });

            return formatter.format(total);
        }

        return (
            <Card style={{width: "95%", height: "auto", margin: 15}} key={"history-" + item.id} elevation={5}>
                <Card.Title
                    title={item.transaction_id}
                    subtitle={item.order_status}
                    titleStyle={{fontSize: 20, fontWeight: "300"}}
                    left={() => generateIcon('file-invoice-dollar')}
                />
                <Divider bold={true}/>
                <Card.Content>
                    <Text style={styles.bill_info_text}>Order Placed: {trimDate(item.createdAt)}</Text>
                    <Text style={styles.bill_info_text}>Number of Items: {item.PurchaseItems.length}</Text>
                    <Text style={styles.bill_info_text}>Order Total: {calculateTotal(item.PurchaseItems)} AUD</Text>
                </Card.Content>
                <Card.Actions>
                    <GeneralButton mode="contained" onPressFunction={() => {
                        router.push({
                            pathname: '/receipt',
                            params: {id: item.id, title: item.transaction_id},
                        });
                    }} text={"View Receipt"} style=""/>
                </Card.Actions>
            </Card>
        )
    };

    const renderBottom = () => {

        return (
            <>
                {hasMore && !loading && (
                    <GeneralButton
                        mode="contained"
                        text="Show more"
                        onPressFunction={handleLoadMore}
                        style={{marginTop: 10, marginBottom: height * 0.2}}
                    />
                )}

                {!hasMore && (
                    <Text style={styles.bottom_text}>You literally hit rock bottom!</Text>
                )}
            </>
        )
    };


    return (
        <AppBackground>
            <View style={styles.full_view}>
                {data?.length == 0 && <View style={styles.no_history}>
                    <Image cachePolicy={"disk"}
                           source={require("@assets/general/empty.gif")}
                           style={styles.empty_history}
                           alt="empty_cart"
                           transition={400}
                           contentFit={"contain"}/>
                    <Text variant="labelLarge" style={styles.no_history_text}>Hey!</Text>
                    <Text variant="labelLarge" style={styles.no_history_text2}>It's lonely in here! Let's do some
                        shopping..</Text>
                </View>}

                {data &&

                    <View style={{flex: 1}}>
                        <FlatList
                            style={{
                                alignSelf: "center",
                                width: width * 0.9,
                            }}
                            data={data}
                            keyExtractor={(item, index) => item.id}
                            numColumns={1}
                            horizontal={false}
                            contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderHistory}
                            ListFooterComponent={renderBottom}
                        />
                    </View>
                }
            </View>
        </AppBackground>
    );
};

const makeStyles = (theme) => StyleSheet.create({
    full_view: {
        width: width * 0.9,
        height: height,
        alignSelf: "center",
    },
    no_history: {
        flex: 1,
        width: '100%',
        borderRadius: 50

    },
    bill_info_text: {
        padding: 5,
        fontSize: 15,
        fontFamily: 'Inter-Black'
    },
    empty_history: {
        height: height * 0.5,
        opacity: 80
    },
    no_history_text: {
        fontSize: 28,
        alignSelf: 'center',
        color: theme.colors.error
    },
    no_history_text2: {
        fontSize: 22,
        alignSelf: 'center',
        textAlign: 'center',
        color: theme.colors.error
    },
    bottom_text: {
        marginTop: 10,
        marginBottom: height * 0.2,
        color: theme.colors.error,
        fontSize: 22,
        fontFamily: 'Inter-Black',
        alignSelf: 'center'
    }
});

export default PurchaseHistory;
