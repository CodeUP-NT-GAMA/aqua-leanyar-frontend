import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string | null;
}

// Mock user data (can be replaced with actual user data)
const initialUser: User = {
    firstName: 'Ravidu',
    lastName: 'Karunathilaka',
    email: 'ravidu@gmail.com',
    profileImage: null,
};

const ProfileScreen: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>(initialUser);
    const [profileImage, setProfileImage] = useState(user.profileImage);
    const [isNameEditVisible, setNameEditVisible] = useState(false);
    const [isEmailEditVisible, setEmailEditVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [newFirstName, setNewFirstName] = useState(user.firstName);
    const [newLastName, setNewLastName] = useState(user.lastName);
    const [newEmail, setNewEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const getPermissions = async () => {
            const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            if (!mediaLibraryPermission.granted || !cameraPermission.granted) {
                Alert.alert('Permission Denied', 'You need to allow permission to access the gallery or camera.');
            }
        };
        getPermissions();
    }, []);

    const handleImagePick = async () => {
        Alert.alert(
            'Choose Option',
            'Select a source',
            [
                { text: 'Gallery', onPress: () => pickImageFromGallery() },
                { text: 'Camera', onPress: () => pickImageFromCamera() },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const pickImageFromGallery = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            const imageUri = pickerResult.assets[0].uri;
            setProfileImage(imageUri);
            setUser({ ...user, profileImage: imageUri });
        }
    };

    const pickImageFromCamera = async () => {
        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            const imageUri = pickerResult.assets[0].uri;
            setProfileImage(imageUri);
            setUser({ ...user, profileImage: imageUri });
        }
    };

    const handleSaveName = () => {
        setUser({ ...user, firstName: newFirstName, lastName: newLastName });
        setNameEditVisible(false);
    };

    const handleSaveEmail = () => {
        setUser({ ...user, email: newEmail });
        setEmailEditVisible(false);
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordModalVisible(false);
        Alert.alert('Success', 'Password updated successfully');
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => router.push('/login') },
        ]);
    };

 const handlePurchaseHistory = () => {
    router.push({
        pathname: '/(protected)/(profile)/purchase_history',
        params: {
            title: 'Purchase History'
        },
    });
};

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handleImagePick}>
                <Image source={profileImage ? { uri: profileImage } : require('@assets/profile_logo.png')} style={styles.profileImage} />
            </TouchableOpacity>

            <View style={styles.fieldContainer}>
                <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                <TouchableOpacity onPress={() => setNameEditVisible(true)}>
                    <Ionicons name="pencil" size={20} color="#007bff" />
                </TouchableOpacity>
            </View>
            <Modal visible={isNameEditVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <TextInput label="First Name" value={newFirstName} onChangeText={setNewFirstName} style={styles.input} />
                    <TextInput label="Last Name" value={newLastName} onChangeText={setNewLastName} style={styles.input} />
                    <Button mode="contained" onPress={handleSaveName} style={styles.saveButton}>Save</Button>
                </View>
            </Modal>

            <View style={styles.fieldContainer}>
                <Text style={styles.email}>{user.email}</Text>
                <TouchableOpacity onPress={() => setEmailEditVisible(true)}>
                    <Ionicons name="pencil" size={20} color="#007bff" />
                </TouchableOpacity>
            </View>
            <Modal visible={isEmailEditVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <TextInput label="Email" value={newEmail} onChangeText={setNewEmail} style={styles.input} />
                    <Button mode="contained" onPress={handleSaveEmail} style={styles.saveButton}>Save</Button>
                </View>
            </Modal>

            <Button mode="contained" onPress={handlePurchaseHistory} style={styles.actionButton}>Purchase History</Button>
            <Button mode="contained" onPress={() => setPasswordModalVisible(true)} style={styles.actionButton}>Change Password</Button>
            <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>Log Out</Button>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', paddingHorizontal: 20 },
    profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
    fieldContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginRight: 10 },
    email: { fontSize: 18, color: '#666', marginRight: 10 },
    modalContainer: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(255,255,255,0.9)' },
    input: { marginBottom: 15, backgroundColor: '#ffffff' },
    actionButton: { backgroundColor: '#007bff', padding: 10, marginVertical: 10 },
    logoutButton: { backgroundColor: '#D9534F', padding: 10, marginVertical: 10 },
    saveButton: { marginVertical: 10 }
});

