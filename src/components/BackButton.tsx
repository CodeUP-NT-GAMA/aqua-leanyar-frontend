// components/BackButton.tsx
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BackButton() {
  const router = useRouter();


  return (
    <Pressable style={styles.button} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={20} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    top: 20, // adjust as needed
    left: 20,
    zIndex: 100,
    elevation: 5,
  },
});
