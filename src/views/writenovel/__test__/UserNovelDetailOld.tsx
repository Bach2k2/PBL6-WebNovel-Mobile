import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SceneMap, TabView } from 'react-native-tab-view'

import NovelInforSettings from './NovelInforSettings';
//import UserChaptersDetail from './UserChaptersDetail';
import { Chapter } from '../../models/Chapter';
import { getChaptersByNovelId } from '../../hook/ChapterApi';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomTabBar } from '../../components/TabView/CustomTabBar';

const TabNav = createMaterialTopTabNavigator();

const UserNovelDetail = ({ navigation, route }: any) => {

    const { novelId } = route.params;
    const [chapters, setChapters] = useState<Chapter[]>([])


    useEffect(() => {
        // console.log(novelId);
        const fetchChaptersByNovelId = async () => {
            const data = await getChaptersByNovelId(novelId)
            setChapters(data);
            console.log(chapters)
        }
        fetchChaptersByNovelId();
    }, [novelId])

    const UserChaptersDetail = () => {
        return (
            <View style={styles.container}>
                {
                    chapters.map((chapter, index) => (
                        <View style={styles.chapterContainer}>
                            <Text>{chapter.name}</Text>
                        </View>
                    ))
                }
            </View >
        );

    }

    return (
        <TabNav.Navigator
            sceneContainerStyle={styles.sceneContainerStyle}
            style={styles.tabNavStyle}
            tabBar={CustomTabBar}
        >
            <TabNav.Screen
                component={UserChaptersDetail}
                name={'UserChapterLists'}
                options={{ title: 'Danh sách chương' }
                }
            />
            <TabNav.Screen
                component={NovelInforSettings}
                name={'NovelSettings'}
                options={{ title: 'Cài đặt truyện' }}
            />
        </TabNav.Navigator>
    );
}

export default UserNovelDetail

const styles = StyleSheet.create({
    tabNavStyle: {
        minHeight: 500,
    },
    sceneContainerStyle: { backgroundColor: 'white' },

    container: { flex: 1, alignSelf: 'center' },
    chapterContainer: {

    },

    listTab: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    btnTab: {

        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
        justifyContent: 'center',
        height: 70,
    },
    textTab: {
        fontSize: 16,
        color: 'black'
    },
    btnTabStatus: {
        backgroundColor: '#E6838D',
    },
    textTabStatus: {
        color: '#fff'
    }
})