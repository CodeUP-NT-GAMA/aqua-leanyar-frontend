import {useEffect, useRef, useState} from "react";
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import PagerView from "react-native-pager-view";

const {height, width} = Dimensions.get('window');

export default function HomeNestedScreen() {
    const pagerRef = useRef<PagerView>(null);
    const pages = ['https://media.istockphoto.com/id/2185186618/photo/christmas-tree-and-gift-boxes-on-purple-background-new-year-concept.jpg?s=2048x2048&w=is&k=20&c=oxpxOmKrtn0GRQN6L-p53eYuKSyFjzlmGczq55RkOeY=', 'https://media.istockphoto.com/id/2185186642/photo/christmas-tree-and-gift-boxes-on-purple-background-new-year-concept.jpg?s=2048x2048&w=is&k=20&c=5NIzn4z6uWqAD0y5EbM_jJIDdn4PMfyYpjkWebq15Ys='];
    const [page, setPage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextPage = (page + 1) % pages.length;
            pagerRef.current?.setPage(nextPage);
            setPage(nextPage);
        }, 3000); // Every 3 seconds

        return () => clearInterval(interval);
    }, [page]);

    return (
        <View className="justify-center flex-1 p-4">
            <PagerView
                ref={pagerRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={(e) => setPage(e.nativeEvent.position)}
            >
                {pages.map((title, idx) => (
                    <View key={'id-' + idx}>
                        <Image source={{
                            uri: title
                        }} style={styles.image}/>
                    </View>
                ))}
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        width
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: width,
        height: height * 0.3,
    }
});
