import * as React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

type Props = {
  title: string;
  subtitle: string;
  image: string;
  content: {
    title: string;
    description: string;
  };
  actions: {
    label: string;
    onPress: () => void;
  }[];
};
const ProductCard = ({ title, subtitle, image, content, actions }: Props) => (
  <Card>
    <Card.Title title={title} subtitle={subtitle} left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">{content.title}</Text>
      <Text variant="bodyMedium">{content.description}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: image }} />
  </Card>
);

export default ProductCard;