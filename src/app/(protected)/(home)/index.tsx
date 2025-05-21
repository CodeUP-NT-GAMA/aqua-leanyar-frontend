import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {Link, useRouter} from "expo-router";
import {useContext, useRef, useState} from "react";
import {AuthContext} from "@/utils/authContext";
import {Avatar, Button, Card, Text, useTheme} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";
import GeneralButton from "@/components/generic/GeneralButton";
import CustomSurface from "@/components/generic/CustomSurface";
import CustomImageCarousal from "@/components/generic/CustomImageCarousal";
import PagerView from "react-native-pager-view";


const {height, width} = Dimensions.get("window");
const LeftContent = props => <Avatar.Icon {...props} icon="check"/>


export default function IndexScreen() {
    const router = useRouter();
    const canGoBack = router.canGoBack();
    const authState = useContext(AuthContext);
    const theme = useTheme();
    const styles = makeStyles(theme);
    const pagerRef = useRef<PagerView>(null);
    const [page, setPage] = useState(0);
    const pages = ['https://media.istockphoto.com/id/2185186618/photo/christmas-tree-and-gift-boxes-on-purple-background-new-year-concept.jpg?s=2048x2048&w=is&k=20&c=oxpxOmKrtn0GRQN6L-p53eYuKSyFjzlmGczq55RkOeY=', 'https://media.istockphoto.com/id/2185186642/photo/christmas-tree-and-gift-boxes-on-purple-background-new-year-concept.jpg?s=2048x2048&w=is&k=20&c=5NIzn4z6uWqAD0y5EbM_jJIDdn4PMfyYpjkWebq15Ys='];


    return (
        <AppBackground>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={styles.container}
                        contentContainerStyle={styles.container}>
                <View style={[styles.column_style]}>

                    <View>
                        <CustomSurface elevation={5} theme={theme} mode={"elevated"} style={styles.surface}>
                            <CustomImageCarousal initialPage={0} pages={pages} style={styles.image_slider} theme={theme}
                                                 delay={3000} pagerRef={pagerRef} page={page} setPage={setPage}/>
                        </CustomSurface>
                    </View>

                    <View>
                        <Card>
                            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent}/>
                            <Card.Content>
                                <Text variant="titleLarge">Card title</Text>
                                <Text variant="bodyMedium">Card content</Text>
                            </Card.Content>
                            <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
                            <Card.Actions>
                                <Button>Cancel</Button>
                                <Button>Ok</Button>
                                <Button>Ok</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                    <View>
                        <Card>
                            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent}/>
                            <Card.Content>
                                <Text variant="titleLarge">Card title</Text>
                                <Text variant="bodyMedium">Card content</Text>
                            </Card.Content>
                            <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
                            <Card.Actions>
                                <Button>Cancel</Button>
                                <Button>Ok</Button>
                            </Card.Actions>
                        </Card>
                    </View>

                    <View>
                        <Link href="/home-nested" push asChild>
                            <GeneralButton mode="contained" onPressFunction={() => {
                                // @ts-ignore
                                router.push("home-nested")
                            }} text={"Push to nested"} style={{}}/>
                        </Link>
                        {canGoBack ? (
                            <GeneralButton
                                text={"Back"}
                                onPressFunction={() => {
                                    router.back();
                                }}
                                mode="contained"
                                style={{}}
                            />
                        ) : null}
                        <GeneralButton mode="contained" text="Log out!" onPressFunction={authState.logOut}
                                       style={{backgroundColor: theme.colors.primary}}/>
                    </View>
                </View>
            </ScrollView>
        </AppBackground>

    );
}

const makeStyles = (theme) => StyleSheet.create({
    surface: {
        height: height * 0.3,
        width: "100%",
        borderRadius: 20
    },
    image_slider: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        width: width,
        alignContent: 'center',
        paddingBottom: height * 0.05
    },
    column_style: {
        flexWrap: "nowrap",
        padding: width * 0.03,
        alignItems: "stretch",
        gap: 10,

    }
});