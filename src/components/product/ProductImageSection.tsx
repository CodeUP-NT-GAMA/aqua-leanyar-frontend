import { View, Image, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FileService } from "@/service/FileService";
import { theme } from "@/theme/theme";
import { useState } from "react";
import { Text } from 'react-native-paper';


export default function ProductImageSection({ data }: any) {

  const [isFavorite, setIsFavorite] = useState(false);

  const styles = makeStyles(theme);
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: FileService.buildURI(data?.data?.ProductMedia[0].MediaId) }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <Pressable
        style={styles.favoriteButton}
        onPress={() => setIsFavorite(!isFavorite)}
      >
        <Text style={styles.favoriteIcon}>
          {isFavorite ? '❤️' : '🤍'}
        </Text>
      </Pressable>
      <View style={styles.imageIndicator}>
        <Text style={styles.imageIndicatorText}>1 / 5</Text>
      </View>
    </View>
  );

}

const makeStyles = (theme) => StyleSheet.create({
  imageContainer: {
    position: 'relative',
    height: 250,
    backgroundColor: theme.colors.background,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageIndicatorText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

