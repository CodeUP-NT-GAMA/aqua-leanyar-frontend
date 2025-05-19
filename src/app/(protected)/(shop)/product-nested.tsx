import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AddButton from '@/components/AddButton';
import { theme } from '@/theme/theme';
import BackButton from '@/components/BackButton';

type ProductParams = {
  name?: string;
  price?: string;
  image?: string;
  description?: string;
};

type Review = {
  id: string;
  name: string;
  comment: string;
  rating: number;
};

type Question = {
  id: string;
  user: string;
  question: string;
  answer?: string;
};

const sampleReviews: Review[] = [
  { id: '1', name: 'John', comment: 'Great product!', rating: 5 },
  { id: '2', name: 'Jane', comment: 'Good quality.', rating: 4 },
];

const sampleQuestions: Question[] = [
  { id: '1', user: 'Tom', question: 'Warranty?', answer: '1 year warranty.' },
  { id: '2', user: 'Sara', question: 'Battery life?', answer: '12 hours.' },
];

export default function ProductNestedScreen() {
  const { name, price, image, description } = useLocalSearchParams<ProductParams>();

  const renderContent = () => (
    <View className="p-4">
      <BackButton/>
      <Image source={{ uri: image }} className="w-full h-80 mb-4" resizeMode="cover" />
      <Text className="text-2xl font-bold text-black mb-2">{name}</Text>
      <Text className="text-xl text-red-600 font-semibold mb-4">{price}</Text>
      <Text className="text-base text-gray-700 mb-6">
        {description || 'High quality product with fast shipping.'}
      </Text>

      {/* Buttons */}
      <View className="flex-row justify-between space-x-2 mb-6">
        <AddButton
          onPress={() => { }}
          icon="plus"
          label="Add to Cart"
          style={{ flex:1, backgroundColor: theme.colors.secondary, paddingVertical: 4, borderRadius: 8, labelStyle: { "font-size": "20" }, width: '100%', marginHorizontal: 2 } }
        >

        </AddButton>
        <AddButton
          onPress={() => {}}
          icon=""
          label="Buy it Now"
          style={{flex:1, backgroundColor: theme.colors.secondary, paddingVertical: 4, borderRadius: 8, labelStyle: { "font-size": "20" }, width: '100%' }}
        ></AddButton>
      </View>

      {/* Reviews */}
      <Text className="text-xl font-semibold mb-3">Customer Reviews</Text>
      {sampleReviews.map((review) => (
        <View key={review.id} className="mb-3 p-3 bg-gray-100 rounded-lg">
          <Text className="font-bold">{review.name}</Text>
          <Text className="text-yellow-500">Rating: {'⭐'.repeat(review.rating)}</Text>
          <Text>{review.comment}</Text>
        </View>
      ))}

      {/* Q&A */}
      <Text className="text-xl font-semibold mt-6 mb-3">Customer Questions</Text>
      {sampleQuestions.map((q) => (
        <View key={q.id} className="mb-3 p-3 bg-gray-100 rounded-lg">
          <Text className="font-bold">{q.user} asked:</Text>
          <Text className="text-gray-800">{q.question}</Text>
          {q.answer && <Text className="text-green-600">Answer: {q.answer}</Text>}
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      data={[]} // no list items, just header/footer content
      renderItem={null}
      ListHeaderComponent={renderContent}
      keyExtractor={() => 'empty'}
    />
  );
}