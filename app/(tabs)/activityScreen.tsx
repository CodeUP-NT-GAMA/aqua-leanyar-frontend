import {Image, View} from "react-native";

export default function ActivityScreen() {
    const activities = [
        'Activity 1',
        'Activity 2',
        'Activity 3',
        'Activity 4',
        'Activity 5',
        'Activity 6',
        'Activity 7',
        'Activity 8',
    ];

    const colors = [
        'bg-yellow-300',
        'bg-blue-400',
        'bg-orange-500',
        'bg-green-400',
        'bg-purple-300',
        'bg-pink-400',
        'bg-amber-500',
        'bg-sky-400',
    ];

    return (
        <View className="flex-1 bg-white px-4 py-6">
            <View className="flex-row flex-wrap justify-between">
                {activities.map((title, index) => (
                    <View
                        key={index}
                        className={`w-[48%] h-40 mb-4 justify-center items-center rounded-xl ${colors[index % colors.length]}`}
                    >
                        <Image
                            source={require("../../assets/images/attraction/attraction1.jpg")}
                            className="w-full h-full rounded-xl">
                        </Image>

                    </View>
                ))}
            </View>
        </View>
    );
}
