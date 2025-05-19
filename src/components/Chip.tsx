import { theme } from '@/theme/theme';
import * as React from 'react';
import { Chip } from 'react-native-paper';

type Props = {
  text: string;
  onPress: () => void;
};

const FilterChip = ({ text, onPress }: Props) => (
  <Chip
    icon="information"
    onPress={onPress}
    style={{
      backgroundColor: '#FBF8EF',
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      marginVertical: 5,
      marginHorizontal: 5,
      width: 125,
      height: 40,
    }}

  >{text}
  </Chip>
);

export default FilterChip;