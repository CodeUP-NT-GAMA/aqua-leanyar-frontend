import {Image, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";

export default function Landing() {
    return (
        <View className="flex-1 justify-center items-center bg-white relative">
            <View className=" w-full h-full flex flex-col justify-between items-center pb-[15%] pt-[70%]"
                  style={{"zIndex": 1}}>
                <Text className="text-4xl font-bold text-black mb-12">
                    Let's Get Wet
                </Text>
                <TouchableOpacity
                    className="bg-primary4 py-3 rounded-lg w-full active:bg-blue-700"
                    onPress={() => router.push("/(auth)/login")}
                >
                    <Text className="text-white text-center text-base font-semibold">
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
            <Image
                source={require("../../assets/images/landing/landing.png")}
                className="w-100% h-100% absolute">

            </Image>

        </View>
    );
}