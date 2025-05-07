import {Slot} from 'expo-router';
import {View} from 'react-native';
import '../../global.css'

export default function AuthLayout() {
    return (
        <View className="flex-1 justify-center bg-white px-6">
            <Slot/>
        </View>
    );
}
