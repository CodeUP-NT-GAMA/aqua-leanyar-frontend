import {Image, TouchableOpacity} from 'react-native';

type SocialButtonProps = {
    imageSource: any;
};
export default function SocialButton({imageSource}: SocialButtonProps) {
    return (
        <TouchableOpacity className="w-20 h-20 flex justify-center items-center bg-primary1 rounded-full  ">
            <Image
                source={imageSource}
                className="w-10 h-10"
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}