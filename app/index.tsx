import {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {router} from 'expo-router';

export default function Index() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            const isLoggedIn = false; // Replace with real auth logic
            const isQRTrue = true;


            if (isLoggedIn) {
                router.replace('/(tabs)/homeSreen');
            } else {
                router.replace('/(auth)/landing')
                //router.replace('/(auth)/login');
            }
        }, 100); // Slight delay to let layout mount

        return () => clearTimeout(timeout); // Cleanup
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-xl mb-2 text-green-700">Checking authentication...</Text>
            <ActivityIndicator size="large" color="#2563eb"/>
        </View>
    );
}
