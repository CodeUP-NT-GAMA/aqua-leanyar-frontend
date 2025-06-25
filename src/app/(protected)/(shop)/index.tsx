import React, { useEffect } from 'react';
import AppBackground from "@/components/generic/AppBackground";
import { Card, Chip, Divider, Searchbar, Text, useTheme } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ProductService } from "@/service/ProductService";
import GeneralButton from "@/components/generic/GeneralButton";
import { FileService } from "@/service/FileService";


const { height, width } = Dimensions.get("window");

export default function ShopScreen() {

    const theme = useTheme();
    const styles = makeStyles(theme);

    const [data, setData] = React.useState([]);
    const [categories, setCategories] = React.useState<any[]>([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [hasMore, setHasMore] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [selectedChips, setSelectedChips] = React.useState<any[]>([]);

    const toggleChip = (chip) => {
        // @ts-ignore
        setSelectedChips((prev) =>
            prev.includes(chip)
                ? prev.filter((c) => c !== chip)
                : [...prev, chip]
        );
    };

    useEffect(() => {
       performeSearch();
    }, [selectedChips, searchQuery])

    const fetchProductTypes = async (pageNumber = 1, pageSize = 100) => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await ProductService.getProductTypes(auth.token, pageNumber, pageSize);

            // @ts-ignore
            setCategories(response.data.result);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    const performeSearch = async (pageNumber = 1, pageSize = 12) => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const typesParam = selectedChips.length > 0
                ? selectedChips.map(chip => chip.id).join(',')
                : null;
            const response = await ProductService.searchProduct(auth.token, {
                types: typesParam,
                name: searchQuery,
                page: pageNumber,
                page_size: pageSize,
            });
            // @ts-ignore
            setData(response.data.result.data);
            setPage(response.data.result.pagination.current_page);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }


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
            setData(prev => {
                const existingIds = new Set(prev.map(p => p.id));
                const newItems = response.data.result.data.filter(p => !existingIds.has(p.id));
                return [...prev, ...newItems];
            });
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
        fetchProductTypes();
        fetchProducts(); // Fetch first page on mount
    }, []);


    const renderProduct = ({ item }: { item: any }) => {

        return (
            <Card style={styles.activity_card} key={"activity-" + item.id} elevation={5}>

                <Card.Cover source={{ uri: FileService.buildURI(item.ProductMedia[0].MediaId) }} />
                <Card.Content>
                    <Text variant="bodyMedium" style={styles.card_content}>{item.product_name}</Text>
                </Card.Content>
                <Card.Actions>
                    <GeneralButton mode={"contained"} text={"View"} style={{}}
                        onPressFunction={() => {
                            router.push({
                                pathname: '/[id]',
                                params: { id: item.product_id, title: item.product_name },
                            });
                        }}>Go to</GeneralButton>
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
                        style={{ marginTop: 10 }}
                    />
                )}

                {!hasMore && (
                    <Text style={styles.endText}>You literally hit rock bottom!</Text>
                )}
            </>
        )
    };

    return (
        <AppBackground>
            <View style={{ flex: 1 }}>

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
                        style={{ flexDirection: "row", marginBottom: 10, paddingLeft: 30, height: 30 }}>
                        {categories.map((cat) => (
                            <Chip key={cat.id} style={{ marginRight: 5, }}
                                selected={selectedChips.includes(cat)}
                                onPress={() => toggleChip(cat)}
                            >{cat.description}</Chip>
                        ))}
                    </ScrollView>
                </View>

                <Divider />

                {data &&

                    <View style={{ flex: 1 }}>
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
                            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                            columnWrapperStyle={{ gap: 10, paddingTop: 10 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderProduct}
                            ListFooterComponent={renderBottom}
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
