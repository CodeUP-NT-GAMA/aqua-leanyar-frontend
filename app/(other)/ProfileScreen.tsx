import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, TextInput, StyleSheet, Modal, Button } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface User {
    first_name: string;
    last_name: string;
    email: string;
    profileImage: string | null;
}

const user: User = {
    first_name: 'Ravidu',
    last_name: 'Karunathilaka',
    email: 'ravidu@gmail.com',
    profileImage: null,
};

const ProfileScreen: React.FC = () => {
    const router = useRouter();

    const [fullName, setFullName] = useState(`${user.first_name} ${user.last_name}`);
    const [email, setEmail] = useState(user.email);
    const [profileImage, setProfileImage] = useState(user.profileImage);
    const [modalVisible, setModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [newName, setNewName] = useState(fullName);
    const [newEmail, setNewEmail] = useState(email);
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

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: () => router.push('/login') },
            ]
        );
    };

    const handleImagePick = async () => {
        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (!mediaLibraryPermission.granted || !cameraPermission.granted) {
            Alert.alert('Permission Denied', 'You need to allow permission to access the gallery or camera.');
            return;
        }

        // Show an option to choose between camera or gallery
        Alert.alert(
            'Choose Option',
            'Select a source',
            [
                { text: 'Gallery', onPress: () => pickImageFromGallery() },
                { text: 'Camera', onPress: () => pickImageFromCamera() },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const pickImageFromGallery = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,  // Ensure it's set to pick images
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setProfileImage(pickerResult.assets[0].uri);
        }
    };

    const pickImageFromCamera = async () => {
        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setProfileImage(pickerResult.assets[0].uri);
        }
    };

    const handleNameEmailChange = () => {
        setFullName(newName);
        setEmail(newEmail);
        setModalVisible(false);
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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleImagePick}>
                <Image
                    source={profileImage ? { uri: profileImage } : require('../../assets/images/profile_logo.png')}
                    style={styles.profileImage}
                />
            </TouchableOpacity>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{fullName}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="pencil" size={20} color="#666" style={styles.pencilIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.email}>{email}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="pencil" size={20} color="#666" style={styles.pencilIcon} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.changePasswordButton} onPress={() => setPasswordModalVisible(true)}>
                <Text style={styles.changePasswordButtonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customLogoutButton} onPress={handleLogout}>
                <Text style={styles.customLogoutButtonText}>Log Out</Text>
            </TouchableOpacity>

            {/* Name & Email Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Update Name & Email</Text>
                        <TextInput style={styles.input} placeholder="New Name" value={newName} onChangeText={setNewName} />
                        <TextInput style={styles.input} placeholder="New Email" value={newEmail} onChangeText={setNewEmail} keyboardType="email-address" />
                        <Button title="Save" onPress={handleNameEmailChange} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Password Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={() => setPasswordModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <TextInput style={styles.input} placeholder="Old Password" value={oldPassword} onChangeText={setOldPassword} secureTextEntry />
                        <TextInput style={styles.input} placeholder="New Password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
                        <TextInput style={styles.input} placeholder="Confirm New Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                        <Button title="Update Password" onPress={handlePasswordChange} />
                        <Button title="Cancel" onPress={() => setPasswordModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ProfileScreen;

// Styles for the component
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', paddingHorizontal: 20 },
    profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
    nameContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginRight: 8 },
    emailContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    email: { fontSize: 18, color: '#666', marginRight: 8 },
    pencilIcon: { width: 20, height: 20, tintColor: '#666' },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContainer: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingHorizontal: 10 },
    changePasswordButton: { marginTop: 20, backgroundColor: '#2C6EBC', padding: 12, borderRadius: 5 },
    changePasswordButtonText: { color: '#fff', fontSize: 16 },
    customLogoutButton: { marginTop: 20, backgroundColor: '#D9534F', padding: 12, borderRadius: 5 },
    customLogoutButtonText: { color: '#fff', fontSize: 16 },
});
