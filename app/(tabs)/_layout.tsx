import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    // Function to handle profile button click
    const navigateToProfile = () => {
        router.push('/(other)/ProfileScreen');
    };

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';
                    if (route.name === 'homeScreen') iconName = 'home';
                    else if (route.name === 'shopScreen') iconName = 'cart';
                    else if (route.name === 'activityScreen') iconName = 'heart';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarShowLabel: false,
                tabBarInactiveTintColor: 'gray',
                headerTitle: () => (
                    <Image
                        source={require('../../assets/images/top_bar_logo.png')}
                        style={styles.topBarLogo}
                    />
                ),
                headerLeft: () => (
                    <Image
                        source={require('../../assets/images/group.png')}
                        style={styles.groupLogo}
                    />
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={navigateToProfile} style={styles.profileButton}>
                        <Image
                            source={require('../../assets/images/profile_logo.png')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                ),
                headerShown: true,
            })}
        />
    );
}

const styles = StyleSheet.create({
    profileButton: {
        marginRight: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    groupLogo: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    topBarLogo: {
        width: 150,
        height: 40,
        resizeMode: 'contain',
    },
});
