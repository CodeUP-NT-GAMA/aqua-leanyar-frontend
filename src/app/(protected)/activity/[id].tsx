import {View} from "react-native";
import {useEffect} from 'react';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import {AppText} from "@/components/AppText";
import {Link} from "expo-router";
import {Button} from "@/components/Button";

export default function ActivityDetailScreen() {
    const {id, title} = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions(
            {
                title: title,
                headerTitleStyle: {
                    fontFamily: "AutourOne-Regular"
                }
            }
        );
    }, [id]);

    return (
        <View className="justify-center flex-1 p-4 bg-pink-200">
            <AppText center>Second Nested Screen : {id}</AppText>
            <Link href="/activity/also-nested" push asChild>
                <Button title="Push to /activity/also-nested"/>
            </Link>
        </View>
    );
}
