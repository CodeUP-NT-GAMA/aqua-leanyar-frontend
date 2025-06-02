import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {useRouter} from "expo-router";
import AppBackground from "@/components/generic/AppBackground";
import {Card, Divider, Text, useTheme} from 'react-native-paper';
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import {ActivityService} from "@/service/ActivityService";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralButton from "@/components/generic/GeneralButton";
import {FileService} from "@/service/FileService";


const {height, width} = Dimensions.get("window");

export default function SecondScreen() {
    const router = useRouter();
    const theme = useTheme();
    const styles = makeStyles(theme);


    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);


    const fetchActivities = async (pageNumber = 1) => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await ActivityService.getActivities(auth.token, pageNumber);


            if (!response.data.result.pagination.next_page) {
                setHasMore(false);
            } else {
                // @ts-ignore
                setData(prev => [...prev, ...response.data.result.data]);
                setPage(response.data.result.pagination.current_page);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities(); // Fetch first page on mount
    }, []);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            fetchActivities(page + 1);
        }
    };

    return (
        <AppBackground>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.container}>
                <View style={styles.view_container}>
                    {
                        data.map(activity => (
                            <Card style={styles.activity_card} key={"activity-" + activity.id} elevation={5}>
                                <Card.Title title={activity.name} subtitle={activity.short_name}
                                            left={() => <FontAwesome name="person-swimming" size={35}
                                                                     color={theme.colors.primary}/>}
                                            titleStyle={styles.card_title}/>
                                <Divider bold={true}/>
                                <Card.Cover source={{uri: FileService.buildURI(activity.ActivityMedia[0].MediaId)}}/>
                                <Card.Content>
                                    <Text variant="bodyMedium" style={styles.card_content}>{activity.description}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <GeneralButton mode={"contained"} text={"Tell me more!"} style={{}}
                                                   onPressFunction={() => {
                                                       router.push({
                                            pathname: 'activity/[id]',
                                            params: {id: activity.id, title: activity.name},
                                        });
                                    }}>Tell me more!</GeneralButton>
                                </Card.Actions>
                            </Card>
                        ))
                    }

                    {hasMore && !loading && (
                        <GeneralButton mode={"contained"} text={"Show more"} onPressFunction={handleLoadMore}
                                       style={{}}/>
                    )}

                    {!hasMore && <Text style={styles.endText}>You have got them all!</Text>}
                </View>


            </ScrollView>
        </AppBackground>
    )
        ;
}

const makeStyles = (theme) => StyleSheet.create({
    container: {
        gap: 12,
        width: width,
        alignContent: 'center',
        paddingBottom: height * 0.05
    },
    activity_card: {
        backgroundColor: theme.colors.secondaryContainer
    },
    view_container: {
        gap: 15,
        padding: width * 0.03,
        flexDirection: "column",
    },
    card_title: {
        fontSize: 20,
        fontWeight: "300",
    },
    card_content: {
        paddingTop: 10,
    },
    endText: {
        alignSelf: "center",
        fontSize: 18,
        fontFamily: 'Inter-Black',
        color: theme.colors.error
    }
});

/**
 * /index
 * /activity (stack)
 *   /activity/index
 *   /activity/nested
 *   /activity/also-nested
 * /third
 * /fourth
 */
