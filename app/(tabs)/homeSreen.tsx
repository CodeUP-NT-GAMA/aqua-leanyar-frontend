import { Text, View, Image, Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-white ">
            <View className= "flex-row w-full justify-between items-center p-4 bg-white" >
                
                    <Image source={require("../../assets/images/group.png")} className="w-10 h-10"/>
               
               
                <Image source={require("../../assets/images/top_bar_logo.png")} className="w-100% h-10"/>
                
               
                <Image source={require("../../assets/images/profile_logo.png")} className="w-10 h-10"/>
              
            </View>
            <View className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                <Pressable onPress={() => { }}>
                    <Image
                        source={require("../../assets/images/activities/activity_1.png")}
                        className="rounded-t-lg w-full h-48"
                        resizeMode="cover"
                    />
                </Pressable>

                <View className="p-5">
                    <Pressable onPress={() => { }}>
                        <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technologgggxxy acquisitions 2021
                        </Text>
                    </Pressable>

                    <Text className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </Text>

                    <Pressable
                        onPress={() => { }}
                        className="inline-flex flex-row items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <Text>Read more</Text>
                        <Svg
                            className="ml-2 w-3.5 h-3.5"
                            viewBox="0 0 14 10"
                            fill="none"
                        >
                            <Path
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export const options = {
    title: 'Home',
};