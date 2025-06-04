import React from 'react';
import AppBackground from "@/components/generic/AppBackground";
import {Card, Chip, Divider, Searchbar, Text, useTheme} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {router} from 'expo-router';
import {ProductService} from "@/service/ProductService";
import GeneralButton from "@/components/generic/GeneralButton";
import {FileService} from "@/service/FileService";


const {height, width} = Dimensions.get("window");

type Product = {
    id: string;
    name: string;
    price: string;
    image: string;
};

const products: Product[] = [
    {
        id: '1',
        name: 'Nike Air Max',
        price: '$120',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    },
    {
        id: '2',
        name: 'Adidas UltraBoost',
        price: '$140',
        image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api'
    },
    {
        id: '3',
        name: 'Puma RS-X',
        price: '$100',
        image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api'
    },
    {
        id: '4',
        name: 'New Balance 550',
        price: '$110',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    },
];

const categories = ['All', 'Sneakers', 'Boots', 'Slides', 'Running', 'Casual'];

export default function ShopScreen() {

    const theme = useTheme();
    const styles = makeStyles(theme);

    const [data, setData] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [hasMore, setHasMore] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [selectedChips, setSelectedChips] = React.useState([]);

    const toggleChip = (chip) => {
        // @ts-ignore
        setSelectedChips((prev) =>
            prev.includes(chip)
                ? prev.filter((c) => c !== chip)
                : [...prev, chip]
        );
    };

    const fetchProducts = async (pageNumber = 1, pageSize = 12) => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await ProductService.getProducts(auth.token, pageNumber, pageSize);
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
            fetchProducts(page + 1, 12);
        }
    };

    React.useEffect(() => {
        fetchProducts(); // Fetch first page on mount
    }, []);


    const renderProduct = ({item}: { product }) => {

        return (
            <Card style={styles.activity_card} key={"activity-" + item.id} elevation={5}>

                <Card.Cover source={{uri: FileService.buildURI(item.ProductMedia[0].MediaId)}}/>
                <Card.Content>
                    <Text variant="bodyMedium" style={styles.card_content}>{item.product_name}</Text>
                </Card.Content>
                <Card.Actions>
                    <GeneralButton mode={"contained"} text={"View"} style={{}}
                                   onPressFunction={() => {
                                       router.push({
                                           pathname: 'activity/[id]',
                                           params: {id: activity.id, title: activity.name},
                                       });
                                   }}>Go to</GeneralButton>
                </Card.Actions>
            </Card>
        )
    };

    return (
        <AppBackground>
            <View style={{flex: 1}}>

                <View>
                    <Searchbar style={{
                        alignSelf: "center",
                        width: width * 0.9,
                        marginTop: height * 0.02,
                        marginBottom: height * 0.01
                    }}
                               placeholder="Search"
                               onChangeText={setSearchQuery}
                               value={searchQuery}
                    />

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                style={{flexDirection: "row", marginBottom: 10, paddingLeft: 30, height: 30}}>
                        {categories.map((cat) => (
                            <Chip key={cat} style={{marginRight: 5,}}
                                  selected={selectedChips.includes(cat)}
                                  onPress={() => toggleChip(cat)}
                            >{cat}</Chip>
                        ))}
                    </ScrollView>
                </View>

                <Divider/>

                {data &&

                    <View style={{flex: 1}}>
                        <FlatList
                            style={{
                                alignSelf: "center",
                                width: width * 0.9,
                                paddingBottom: height * 0.1,
                            }}
                            data={data}
                            keyExtractor={(item, index) => item.product_id}
                            numColumns={2}
                            horizontal={false}
                            contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}
                            columnWrapperStyle={{gap: 10, paddingTop: 10}}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderProduct}
                            ListFooterComponent={() => (
                                <>
                                    {hasMore && !loading && (
                                        <GeneralButton
                                            mode="contained"
                                            text="Show more"
                                            onPressFunction={handleLoadMore}
                                            style={{marginTop: 10}}
                                        />
                                    )}

                                    {!hasMore && (
                                        <Text style={styles.endText}>You literally hit rock bottom!</Text>
                                    )}
                                </>
                            )}
                        />
                    </View>
                }

            </View>
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
    activity_card: {
        width: width * 0.43,
        backgroundColor: theme.colors.secondaryContainer
    },
    view_container: {
        gap: 10,
        flexDirection: "column",
    },
    card_title: {
        fontSize: 20,
        fontWeight: "300",
    },
    card_content: {
        paddingTop: 10,
        fontSize: 18
    },
    endText: {
        alignSelf: "center",
        fontSize: 18,
        paddingTop: 30,
        fontFamily: 'Inter-Black',
        color: theme.colors.error
    }
});
