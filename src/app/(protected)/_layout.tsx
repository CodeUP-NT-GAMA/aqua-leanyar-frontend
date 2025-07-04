import "../../../global.css";
import {StatusBar} from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {AuthContext} from "@/utils/authContext";
import {useCart} from "@/components/generic/CartContext";
import {Redirect, Tabs} from "expo-router";
import React from "react";


export const unstable_settings = {
    initialRouteName: "(home)", // anchor
};

export default function RootLayout() {

    const authState = React.useContext(AuthContext);
    const cartContext = useCart();

    if (!authState.isReady) {
        return null;
    }

    if (!authState.isLoggedIn) {
        // @ts-ignore
        return <Redirect href="/login"/>;
    }

    return (
        <React.Fragment>
            <StatusBar style="auto"/>
            <Tabs
                screenOptions={{tabBarActiveTintColor: "teal"}}
                backBehavior="order"
            >
                <Tabs.Screen
                    name="(home)"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarLabel: "Home",
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons
                                name="water-polo"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="activity"
                    options={{
                        title: "Activities",
                        tabBarLabel: "Activities",
                        headerShown: false,
                        popToTopOnBlur: true,
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons
                                name="ski-water"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="(shop)"
                    options={{
                        title: "Shop",
                        tabBarLabel: "Shop",
                        headerTitleStyle: {fontFamily: "AutourOne-Regular"},
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons
                                name="shopping"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cart"
                    options={{
                        title: "Cart",
                        tabBarBadge: cartContext?.count > 0 ? cartContext?.count : undefined,
                        headerTitleStyle: {fontFamily: "AutourOne-Regular"},
                        tabBarBadgeStyle: {
                            backgroundColor: "tomato",
                            color: "white",
                        },
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons
                                name="cart-heart"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="(profile)"
                    options={{
                        title: "Profile",
                        headerTitleStyle: {fontFamily: "AutourOne-Regular"},
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons
                                name="emoticon-happy-outline"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </React.Fragment>
    );
}
