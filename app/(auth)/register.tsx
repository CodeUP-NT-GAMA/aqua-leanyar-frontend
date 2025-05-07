import {KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from 'react-native';
import {router} from 'expo-router';
import SocialButton from '../components/buttons/SocialButton';
import InputField from '../components/fields/InputField';

export default function RegisterScreen() {
    const handleRegister = () => {
        router.replace('/');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 bg-white justify-center px-4"
        >
            <View className="w-full">
                <View className="mb-12">
                    <Text className="text-4xl font-bold text-black">
                        Create an {"\n"} Account!
                    </Text>
                </View>
                <View className=" flex flex-col gap-y-4">
                    <InputField placeholder='Username or Password'
                                prefixIcon={require("../../assets/images/user.png")}/>
                    <InputField placeholder='Password' prefixIcon={require("../../assets/images/lock.png")}
                                suffixIcon={require("../../assets/images/eye.png")}/>
                    <InputField placeholder='Confirm Password' prefixIcon={require("../../assets/images/lock.png")}
                                suffixIcon={require("../../assets/images/eye.png")}/>
                    <Text style={[{color: "#676767"}, {fontSize: 12}]}>
                        By clicking the Register buttpn, you agree to the public offer.
                    </Text>
                    <TouchableOpacity
                        className="bg-primary4 py-3 rounded-full active:bg-blue-700"
                        onPress={handleRegister}
                    >
                        <Text className="text-white text-center font-bold text-xl">
                            Create Account
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
                    onPress={() => router.push("/(auth)/login")}
                    className="mt-6"
                >
                    <Text className="text-center text-gr  text-base">
                        I Already Have an Account {" "}
                        <Text className="underline text-primary2">Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
