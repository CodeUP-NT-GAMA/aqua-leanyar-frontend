import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';

type InputFieldProps = {
    placeholder: string,
    secureTextEntry?: boolean,
    prefixIcon?: any,
    suffixIcon?: any,
};
export default function InputField({placeholder, secureTextEntry, prefixIcon, suffixIcon}: InputFieldProps) {

    const [secure, setSecure] = useState(true);
    return (
        <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 py-3"
              style={{height: 60}}>
            <Image
                source={prefixIcon}
                className="w-5 h-5 mr-2"
                resizeMode="contain"
            />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#ccc"
                secureTextEntry={secureTextEntry}
                className="flex-1 text-base text-black"
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Image
                    source={suffixIcon}
                    className="w-5 h-5 mr-2"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}