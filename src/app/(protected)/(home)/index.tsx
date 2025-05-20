import {Image, StyleSheet, View} from "react-native";
import {AppText} from "@/components/AppText";
import {Link, useRouter} from "expo-router";
import {Button} from "@/components/Button";
import {useContext} from "react";
import {AuthContext} from "@/utils/authContext";
import {useTheme} from 'react-native-paper';
import PagerView from 'react-native-pager-view';


export default function IndexScreen() {
    const router = useRouter();
    const canGoBack = router.canGoBack();
    const authState = useContext(AuthContext);
    const theme = useTheme();

    return (
        <View className="justify-center flex-1 p-4 ">
            <PagerView style={styles.pagerView} initialPage={0} collapsable={false}>
                <View key="1" style={styles.item}>
                    <Image source={require('../../../../assets/general/generic-1.jpg')}/>
                </View>
                <View key="2" style={styles.item}>
                    <Image source={require('../../../../assets/general/generic-2.jpg')}/>
                </View>
            </PagerView>

            <AppText center>Index` Screen</AppText>
            <Link href="/home-nested" push asChild>
                <Button title="Push to /home-nested"/>
            </Link>
            {canGoBack ? (
                <Button
                    title="Back"
                    theme="primary"
                    onPress={() => {
                        router.back();
                    }}
                />
            ) : null}
            <Button title="Log out!" onPress={authState.logOut} style={{backgroundColor: theme.colors.primary}}/>
        </View>

    );
}

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
