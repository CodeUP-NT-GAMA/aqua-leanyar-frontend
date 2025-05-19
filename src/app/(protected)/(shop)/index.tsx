import React from 'react';
import SearchBar from '@/components/SearchBar';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import FilterChip from '@/components/Chip';
import ProductCard from '@/components/ProductCard';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

const products: Product[] = [
  { id: '1', name: 'Nike Air Max', price: '$120', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
  { id: '2', name: 'Adidas UltraBoost', price: '$140', image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api' },
  { id: '3', name: 'Puma RS-X', price: '$100', image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api' },
  { id: '4', name: 'New Balance 550', price: '$110', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
];

const categories = ['All', 'Sneakers', 'Boots', 'Slides', 'Running', 'Casual'];

export default function ShopScreen() {
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/product-nested',
          params: {
            name: item.name,
            price: item.price,
            image: item.image,
            description: 'High quality product with fast shipping!',
          },
        });
      }}
      className="w-[48%] mb-4"
    >
      <ProductCard item={item} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <SearchBar/>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        {categories.map((cat) => (
          <FilterChip text="ffff" key={cat} onPress={() => {}}/>
        ))}
      </ScrollView>

      <FlatList
        data={ products }
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={renderProduct}
      />
    </View>
  );
}
