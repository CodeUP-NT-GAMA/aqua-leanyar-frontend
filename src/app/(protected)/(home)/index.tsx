import {Dimensions, StyleSheet, View} from "react-native";
import {Link, useRouter} from "expo-router";
import {useContext, useRef, useState} from "react";
import {AuthContext} from "@/utils/authContext";
import {useTheme} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";
import GeneralButton from "@/components/generic/GeneralButton";
import CustomSurface from "@/components/generic/CustomSurface";
import CustomImageCarousal from "@/components/generic/CustomImageCarousal";
import PagerView from "react-native-pager-view";

const {height} = Dimensions.get("window");


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
            <View className="justify-center flex-1 p-4 ">

                <CustomSurface elevation={5} theme={theme} mode={"elevated"} style={styles.surface}>
                    <CustomImageCarousal initialPage={0} pages={pages} style={styles.image_slider} theme={theme}
                                         delay={3000} pagerRef={pagerRef} page={page} setPage={setPage}/>
                </CustomSurface>

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
        </AppBackground>

    );
}

const makeStyles = (theme) => StyleSheet.create({
    surface: {
        width: "100%",
        height: height * 0.3,
    },
    image_slider: {
        flex: 1,
    }
});