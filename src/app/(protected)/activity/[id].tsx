import { Dimensions, ScrollView, StyleSheet, View, Image } from "react-native";
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ActivityService } from "@/service/ActivityService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Card, Chip, Divider, useTheme, ActivityIndicator } from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { FileService } from "@/service/FileService";
import GeneralButton from "@/components/generic/GeneralButton";

const { height, width } = Dimensions.get("window");

export default function ActivityDetailScreen() {
    const { id, title } = useLocalSearchParams();
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = makeStyles(theme);

    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [imageIndex, setImageIndex] = useState(0);

    const fetchActivity = async (id) => {
        try {
            setLoading(true);
            const value = await AsyncStorage.getItem("auth-key");
            // @ts-ignore
            const auth = JSON.parse(value);
            const response = await ActivityService.getActivity(auth.token, id);

            if (response.status === 200) {
                setData(response.data.result);
            }
        } catch (error) {
            console.error('Error fetching activity:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerTitleStyle: {
                fontFamily: "AutourOne-Regular"
            }
        });
        fetchActivity(id);
    }, [id]);

    const generateIcon = (icon) => {
        return <FontAwesome name={icon} size={30} color={theme.colors.primary} />;
    };

    const renderImageGallery = () => {
        if (!data.ActivityMedia || data.ActivityMedia.length === 0) return null;

        return (
            <View style={styles.imageSection}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / width);
                        setImageIndex(index);
                    }}
                >
                    {data.ActivityMedia.map((media, index) => (
                        <Image
                            key={`media-${index}`}
                            source={{ uri: FileService.buildURI(media.MediaId) }}
                            style={styles.activityImage}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {data.ActivityMedia.length > 1 && (
                    <View style={styles.imageIndicator}>
                        {data.ActivityMedia.map((_, index) => (
                            <View
                                key={`indicator-${index}`}
                                style={[
                                    styles.indicatorDot,
                                    index === imageIndex && styles.indicatorDotActive
                                ]}
                            />
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const renderInfoCard = (title, content, icon) => {
        if (!content) return null;

        return (
            <Card style={styles.infoCard} elevation={2}>
                <Card.Content>
                    <View style={styles.cardHeader}>
                        {generateIcon(icon)}
                        <Text style={styles.cardTitle}>
                            {title}
                        </Text>
                    </View>
                    <Divider style={styles.cardDivider} />
                    <Text style={styles.cardContent}>
                        {content}
                    </Text>
                </Card.Content>
            </Card>
        );
    };

    if (loading) {
        return (
            <AppBackground>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Loading activity details...</Text>
                </View>
            </AppBackground>
        );
    }

    return (
        <AppBackground>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {/* Image Gallery */}
                {renderImageGallery()}

                {/* Content Cards */}
                <View style={styles.contentSection}>
                    {renderInfoCard("Description", data.description, "info-circle")}

                    {data.requirements && renderInfoCard(
                        "Requirements",
                        data.requirements,
                        "list-check"
                    )}

                    {data.duration && renderInfoCard(
                        "Duration",
                        data.duration,
                        "clock"
                    )}

                    {data.difficulty && renderInfoCard(
                        "Difficulty Level",
                        data.difficulty,
                        "chart-line"
                    )}

                    {data.location && renderInfoCard(
                        "Location",
                        data.location,
                        "location-dot"
                    )}

                    {data.equipment && renderInfoCard(
                        "Equipment Needed",
                        data.equipment,
                        "toolbox"
                    )}

                    {data.safety_notes && renderInfoCard(
                        "Safety Information",
                        data.safety_notes,
                        "shield-halved"
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionSection}>
                    <GeneralButton
                        mode="outlined"
                        text="Save for Later"
                        style={styles.secondaryButton}
                        onPressFunction={() => {
                            // Handle save for later action
                            console.log('Saving activity:', data.name);
                        }}
                    />
                </View>

                {/* Tags/Categories */}
                {data.tags && data.tags.length > 0 && (
                    <View style={styles.tagsSection}>
                        <Text style={styles.tagsTitle}>
                            Tags
                        </Text>
                        <View style={styles.tagsContainer}>
                            {data.tags.map((tag, index) => (
                                <Chip
                                    key={`tag-${index}`}
                                    style={styles.tag}
                                    textStyle={styles.tagText}
                                >
                                    {tag}
                                </Chip>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </AppBackground>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    container: {
        paddingBottom: height * 0.05,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        color: theme.colors.onSurface,
    },
    imageSection: {
        position: 'relative',
        marginBottom: 16,
    },
    activityImage: {
        width: width,
        height: height * 0.3,
        padding: 5
    },
    imageIndicator: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    indicatorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    indicatorDotActive: {
        backgroundColor: theme.colors.primary,
    },
    contentSection: {
        padding: 5,
        gap: 12,
    },
    infoCard: {
        backgroundColor: theme.colors.background,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    cardTitle: {
        fontWeight: '600',
        color: theme.colors.primary,
    },
    cardDivider: {
        marginBottom: 12,
    },
    cardContent: {
        lineHeight: 22,
        color: theme.colors.onSurface,
    },
    actionSection: {
        padding: width * 0.05,
        gap: 12,
    },
    primaryButton: {
        marginBottom: 8,
    },
    secondaryButton: {
        borderColor: theme.colors.primary,
    },
    tagsSection: {
        padding: width * 0.05,
        paddingTop: 0,
    },
    tagsTitle: {
        marginBottom: 12,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: theme.colors.primaryContainer,
    },
    tagText: {
        color: theme.colors.onPrimaryContainer,
        fontSize: 12,
    },
});