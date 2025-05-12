import { View } from "react-native";
import EventCard from "../components/other/EventCard";
import ProductCarousel from "../components/other/ProductCarousel";
import Map from "../components/other/Map";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-white ">
            <EventCard />
            <ProductCarousel />
            <Map />
        </View>
    )
}

export const options = {
    title: 'Home',
};