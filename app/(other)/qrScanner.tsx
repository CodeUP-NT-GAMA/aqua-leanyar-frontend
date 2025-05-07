import {Alert, Pressable, Text, View} from "react-native";
import {useCameraPermissions} from "expo-camera";
import {useState} from "react";
import Scanner from "../components/other/Scanner";
import {SafeAreaView} from "react-native-safe-area-context";

export default function QRScannerScreen() {
    const [permissions, requestPermissions] = useCameraPermissions();
    const [showScanner, setShowScanner] = useState(false);

    const handleNavigateToScanner = async () => {
        if (permissions?.granted) {
            setShowScanner(true);
        }
        const {status} = await requestPermissions();
        if (status !== "granted") {
            Alert.alert(
                "Camera Permission Required",
                "Please allow camera access to use the QR scanner.",
                [{text: "OK"}]
            );
            return;
        }
        setShowScanner(true);
    };

    if (showScanner) {
        return <Scanner/>;
    }
    return (
        <SafeAreaView edges={[]} className="flex-1 justify-center items-center bg-white">
            <View className="flex-1 justify-center items-center bg-white ">
                <Text className="text-xl mb-4 text-green-700">QR Scanner Main Screen</Text>
                <Pressable
                    onPress={handleNavigateToScanner}
                    className="bg-blue-600 py-3 px-6 rounded-lg active:bg-blue-700"
                >
                    <Text className="text-white text-center text-base font-semibold">
                        Open QR Scanner
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>

    );
}
