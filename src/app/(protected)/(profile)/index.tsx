import React, {useContext} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {useRouter} from 'expo-router';
import {Image} from 'expo-image'
import {useTheme} from 'react-native-paper';
import {AuthContext} from "@/utils/authContext";
import AppBackground from "@/components/generic/AppBackground";
import GeneralButton from "@/components/generic/GeneralButton";

const {height, width} = Dimensions.get("window");


const ProfileScreen: React.FC = () => {
    const authState = useContext(AuthContext);
    const theme = useTheme();
    const router = useRouter();
    const styles = makeStyles(theme);


    const handlePurchaseHistory = () => {
        router.push({
            pathname: '/(protected)/(profile)/purchase_history',
            params: {
                title: 'Purchase History'
            },
        });
    };

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>

                <View style={{width: "100%", padding: width * 0.1}}>
                    <Image cachePolicy={"disk"}
                           source={require("@assets/images/profile-2.gif")}
                           style={styles.image}
                           transition={200}
                           alt="empty_cart"
                           contentFit={"contain"}/>
                </View>

                <GeneralButton mode="contained" text="Purchases" onPressFunction={handlePurchaseHistory}
                               style={{backgroundColor: theme.colors.primary}}/>

                <GeneralButton mode="contained" text="Log out!" onPressFunction={authState.logOut}
                               style={{backgroundColor: theme.colors.primary}}/>

            </ScrollView>
        </AppBackground>
    );

};

const makeStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.8,
        alignSelf: 'center',
    },
    image: {
        paddingTop: 20,
        height: height * 0.25,
        shadowOpacity: 0.2,
        opacity: 50

    },

});

export default ProfileScreen;

