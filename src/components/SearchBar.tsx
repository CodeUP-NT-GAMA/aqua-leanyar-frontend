import { theme } from '@/theme/theme';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery} 
      style={{
        backgroundColor: theme.colors.primary3,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
      }}
      />
  );
};

export default MyComponent;
