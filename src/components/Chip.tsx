import { theme } from '@/theme/theme';
import * as React from 'react';
import { Chip } from 'react-native-paper';

type Props = {
  text: string;
  onPress: () => void;
  icon: string;
};

const FilterChip = ({ text, onPress, icon }: Props) => (
  <Chip
    icon={icon}
    onPress={onPress}
    style={{
      backgroundColor: '#FBF8EF',
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      marginVertical: 20,
      marginHorizontal: 5,
      width: 125,
      height: 40,
    }}

  >{text}
  </Chip>
);

export default FilterChip;