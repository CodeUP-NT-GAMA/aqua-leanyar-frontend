import { Image, Text, View } from "react-native";
import AddButton from "./AddButton";
import { theme } from "@/theme/theme";
import { useState } from "react";

export default function ProductCard({ item }) {
  const [imageError, setImageError] = useState(false);
  return (
    <View className="bg-white rounded-lg overflow-hidden shadow-sm border border-bg-primary">
      <Image  source={
          imageError
            ? require("../../assets/fallback.png") // Local fallback image
            : { require: "../ /../assets/nike.jpg" }
        }
        onError={() => setImageError(true)}alt={item.name} className="w-full h-32" resizeMode="cover" />
      <View className="p-2">
        <Text className="font-semibold text-sm">{item.name}</Text>
        <Text className="text-gray-500 text-xs">{item.price}</Text>
        <AddButton
          onPress={() => {}}
          icon="plus"
          label="Add to Cart"
          style={{ backgroundColor: theme.colors.secondary, paddingVertical: 4, borderRadius: 8, labelStyle: { "font-size": "20" } }}
        ></AddButton>
        {/* <TouchableOpacity className="mt-2 bg-black py-1 rounded">
          <Text className="text-white text-center text-sm">Add to Cart</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}