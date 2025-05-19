import React from 'react';
import SearchBar from '@/components/SearchBar';

import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import FilterChip from '@/components/Chip';
import ProductCard from '@/components/ProductCard';
import BackButton from '@/components/BackButton';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};


const products: Product[] = [
  { id: '1', name: 'Nike Air Max', price: '$120', image: "https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api" },
  { id: '2', name: 'Adidas UltraBoost', price: '$140', image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api' },
  { id: '3', name: 'Puma RS-X', price: '$100', image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api' },
  { id: '4', name: 'New Balance 550', price: '$110', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
  { id: '5', name: 'Nike Air Max', price: '$120', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
  { id: '6', name: 'Adidas UltraBoost', price: '$140', image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api' },
  { id: '7', name: 'Puma RS-X', price: '$100', image: 'https://tse1.mm.bing.net/th/id/OIP.H3FaN2EhQS38nzi2nE5SKgHaIp?pid=Api' },
  { id: '8', name: 'New Balance 550', price: '$110', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
];

const categories = [{ name: 'All', icon: "information" }, { name: 'Sneakers', icon: "shoe-formal" }, { name: 'Boots', icon: "shoe-sneaker" }, { name: 'Slides', icon: "hanger" }, { name: 'Sandals', icon: "information" }, { name: 'Heels', icon: "information" }];


export default function ShopScreen() {
  const renderProduct = ({ item }: { item: typeof products[0] }) => (
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
      style={styles.productWrapper}
    >
      <ProductCard item={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <SearchBar />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {categories.map((cat) => (
            <FilterChip text={cat.name} key={cat.name} onPress={() => { }} icon={cat.icon} />
          ))}
        </ScrollView>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={renderProduct}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 80, // Push content below the floating back button
  },
  chipScroll: {
    marginVertical: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 100,
  },
  productWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});


