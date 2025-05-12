import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';



export default function ProductCarousel() {

  return (
    <View className='w-100% h-20 bg-yellow-300'>
      <Pressable onPress={() => router.push('/(other)/ViewProduct')}>
        <Text>
          Carousel
        </Text>
      </Pressable>

    </View>
  );
}