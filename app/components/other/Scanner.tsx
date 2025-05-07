import {StyleSheet, Text, View} from "react-native";
import {CameraView} from "expo-camera";
import {Href, router, useFocusEffect} from "expo-router";
import {useState} from "react";

export default function Scanner() {
    const [scanned, setScanned] = useState(false);
    useFocusEffect(() =>
        setScanned(false) // Reset scanned state when screen is focused
    );
    const handleBarcodeScanned = ({data}: { data: string }) => {
        if (scanned) return; // Prevent multiple scans

        setScanned(true);
        const url = new URL(data);
        const path = url.pathname;
        console.log("Scanned dataaaaa:", data);
        router.push(path as Href)
        // You can navigate or show modal here after scanning
    };

    return (
        <View className="flex-1">
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            >
                <View className="flex-1 justify-center items-center bg-transparent">
                    <View className="w-64 h-64 border-4 border-green-500 rounded-md bg-transparent"/>
                    <Text className="mt-6 text-[18px] text-[#fff]">Align the QR code within the box</Text>
                </View>
            </CameraView>
        </View>
    );
}