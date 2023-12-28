import React, { useEffect, useState } from 'react';
import {
    Animated,
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Button,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import UserChaptersDetail from './Chapter/UserChaptersDetail';
import NovelInforSettings from './NovelInforSettings';
import { Novel } from '../../models/Novel';

interface UserNovelDetailProps {
    novel: Novel;
}

interface Route {
    key: string;
    title: string;
}

const UserNovelDetail = ({ route, navigation }: any) => {


    const [index, setIndex] = useState(0);
    const { novel } = route.params

    useEffect(() => {
        navigation.setOptions({
            title: novel.name,
            headerRight: () => (
                <Button
                    onPress={() => {
                        navigation.navigate('CreateChapter',{novel:novel})
                    }}
                    title="New Chapter"
                />
            ),
        });
    }, [navigation, novel]);
    const [routes] = useState([
        { key: 'first', title: 'Chapter Published' },
        { key: 'second', title: 'Info Settings' },
    ]);


    const handleIndexChange = (newIndex: number) => setIndex(newIndex);

    const renderTabBar = (props: any) => {
        const inputRange = props.navigationState.routes.map(
            (x: any, i: any) => i
        );

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route: Route, i: number) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex: number) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });
                    const color = index === i ? 'black' : 'gray';

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            key={i}
                            onPress={() => setIndex(i)}>
                            <Animated.Text style={[{ opacity, color }, styles.tabText]}>
                                {route.title}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = () => {
        const currentRoute = routes[index];
        switch (currentRoute.key) {
            case 'first':
                return <UserChaptersDetail novel={novel} />;
            case 'second':
                return <NovelInforSettings novel={novel} />;
            default:
                return null;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
        // backgroundColor: 'red',
        // marginBottom: 10,
    },
    tabItem: {
        paddingLeft: 16,
    },
    tabText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default UserNovelDetail;
