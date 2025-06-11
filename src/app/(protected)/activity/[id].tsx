import {Dimensions, View} from "react-native";
import {useEffect, useState} from 'react';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import {ActivityService} from "@/service/ActivityService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";

const {height, width} = Dimensions.get("window");


export default function ActivityDetailScreen() {
    const {id, title} = useLocalSearchParams();
    const navigation = useNavigation();
    const [data, setData] = useState({});

    const fetchActivity = async (id) => {
        try {
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await ActivityService.getActivity(auth.token, id);

            if (response.status === 200) {
                setData(response.data.result);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };


    useEffect(() => {

        navigation.setOptions(
            {
                title: title,
                headerTitleStyle: {
                    fontFamily: "AutourOne-Regular"
                }
            }
        );

        fetchActivity(id);
    }, [id]);


    return (
        <AppBackground>
            <View style={{flex: 1, width: width * 0.9, alignSelf: "center"}}>
                <Text style={{fontFamily: 'AutourOne-Regular', fontSize: 18}}>
                    {data.description}
                </Text>
            </View>

        </AppBackground>
    );
}
