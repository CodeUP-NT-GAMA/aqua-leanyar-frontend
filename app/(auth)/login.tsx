import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {router} from "expo-router";
import SocialButton from "../components/buttons/SocialButton";

export default function LoginScreen() {
    const handleLogin = () => {
        // TODO: Replace with real auth logic
        router.replace("/(tabs)/homeSreen"); // Navigate to home if logged in
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 bg-white justify-center px-4"
        >
            {/* Wrapper View */}
            <View className="w-full">
                {/* Header */}
                <View className="mb-12">
                    <Text className="text-4xl font-bold text-black">
                        Welcome {"\n"} Back!
                    </Text>
                </View>

                {/* Form */}
                <View className=" flex flex-col gap-y-4">
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#ccc"
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base text-black"
                    />

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#ccc"
                        secureTextEntry
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base text-black"
                    />

                    <TouchableOpacity
                        className="bg-primary4 py-3 rounded-lg active:bg-blue-700"
                        onPress={handleLogin}
                    >
                        <Text className="text-black text-center text-base font-semibold">
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Register Link */}

                <View className="flex flex-col items-center mt-8">
                    <Text>
                        - Or Continue with -
                    </Text>
                    <View className="flex flex-row justify-center gap-x-4 mt-4">
                        <SocialButton imageSource={require("../../assets/images/google.png")}/>
                        <SocialButton imageSource={require("../../assets/images/facebook.png")}/>
                        <SocialButton imageSource={require("../../assets/images/apple.png")}/>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => router.push("/(auth)/register")}
                    className="mt-6"
                >
                    <Text className="text-center text-black font-medium">
                        Don't have an account?{" "}
                        <Text className="underline text-blue-600">Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
