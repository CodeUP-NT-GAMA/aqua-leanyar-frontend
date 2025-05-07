import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {useColorScheme} from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();

  return (
      <Tabs
          screenOptions={({route}) => ({
              tabBarIcon: ({color, size}) => {
                  let iconName: keyof typeof Ionicons.glyphMap = 'home';
                  console.log(route.name);
                  if (route.name === 'homeScreen') iconName = 'home';
                  else if (route.name === 'profileScreen') iconName = 'person';
                  else if (route.name === 'shopScreen') iconName = 'cart';
                  else if (route.name === 'activityScreen') iconName = 'heart';

                  return <Ionicons name={iconName} size={size} color={color}/>;
              },
              tabBarActiveTintColor: 'blue',
              tabBarShowLabel: false,
              tabBarInactiveTintColor: 'gray',
              headerShown: true,
          })}
      />
  );
}
