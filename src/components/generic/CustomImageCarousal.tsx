import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView from "react-native-pager-view";
import {Image} from "expo-image";


export default function CustomImageCarousal({
                                                initialPage,
                                                pages,
                                                style,
                                                theme,
                                                delay,
                                                pagerRef,
                                                page,
                                                setPage,
                                                ...props
                                            }) {

    useEffect(() => {
        const interval = setInterval(() => {
            let nextPage = (page + 1) % pages.length;
            pagerRef.current?.setPage(nextPage);
            setPage(nextPage);
        }, delay); // Every 3 seconds

        return () => clearInterval(interval);
    }, [page]);

    return (
        <PagerView
            ref={pagerRef}
            style={[
                styles.surface,
                style,
            ]}
            initialPage={initialPage}
            onPageSelected={(e) => setPage(e.nativeEvent.position)}
            {...props}
        >
            {pages.map((src, idx) => (
                <View key={'id-' + idx}>
                    <Image source={src}
                           style={styles.image}
                           cachePolicy={"disk"}
                    />
                </View>
            ))}
        </PagerView>
    );
}

const styles = StyleSheet.create({
    surface: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20

    }
});

