import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getTopTrendingNovelApi } from '../../hook/NovelApi';
import { Novel } from '../../models/Novel';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../../theme/theme';
import Skeleton from '../../components/Loading/Skeleton';

import { AxiosContext } from '../../context/AxiosContext';
import QuizMedal from '../../components/QuizMedal/QuizMedal';
import dynamicLinks from '@react-native-firebase/dynamic-links'
export function RankingList({ navigation }: any) {

    const [loading, setLoading] = useState(true);
    const [novels, setNovels] = useState(Array<Novel>());
    const { authAxios } = useContext(AxiosContext)

    const fetchNovelData = async () => {
        await getTopTrendingNovelApi(authAxios).then((data) => {
            setNovels(data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        fetchNovelData();
    }, [])

    const renderColumn = (row: number) => {
        return (
            <View style={styles.columnContainer} key={row}>
                {novels.slice(row * 4, (row + 1) * 4).map((novel, index) =>
                (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.novelContainer} onPress={() => {
                            navigation.navigate('NovelDetail', { novelId: novel.id, title: novel.title });
                        }}>
                            <View>
                                <QuizMedal rank={row * 4 + index + 1} />
                            </View>
                            <Image source={{ uri: novel.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.novelImage} />
                            <View style={styles.novelContent}>
                                <Text numberOfLines={2} style={styles.normalTitle}>{novel.name}</Text>
                                <Text numberOfLines={1} style={styles.subTitle}>{novel.genreName.slice(0, 2).join(' ')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        )
    }
    // render 
    if (loading) {
        return (
            <Skeleton height={30} width={500} style={{ borderRadius: 5, marginBottom: 5 }} />
        );
    }
    return (
        <View style={styles.container}>
            <View style={{
                margin: 10,
            }}>
                <Text style={styles.headerTitle}>Rankings</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {Array.from({ length: Math.ceil(novels.length / 5) }, (_, index) => renderColumn(index))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: 7,
        width: '95%',
    },
    component: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },


    columnContainer: {
        flexDirection: 'column',
        width: 350,
        marginRight: 10,
        minHeight: 400
    },

    //Text:
    headerTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
        textAlign: 'left',
        overflow: 'hidden',
        fontWeight: '700',
    },
    normalTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryBlackHex,
        marginTop: SPACING.space_10,
        fontSize: FONTSIZE.size_14,
        textAlign: 'left',
        overflow: 'hidden',
    },
    subTitle: {
        marginTop: 5,
        fontSize: FONTSIZE.size_14,
    },
    // for the rmd -bookmark
    rcm_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 120,
        borderRadius: 10,
    },
    text: {
        marginTop: 5,
        textAlign: 'center',
    },
    // Reading Preferences
    imageRow: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    prefer_image: {
        margin: 5,
        width: 70,
        height: 100,
        borderRadius: 10,
    },
    textContainer: {
        width: 50, // Match the image width
        marginLeft: 7
    },
    text_imgrow: {
        marginTop: 5,
        textAlign: 'left',
        fontSize: 14,
    },
    // all novels
    novelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    novelImage: {
        width: 80,
        height: 100,
        marginRight: 10,
    },
    novelContent: {
        maxWidth: 180, // Điều chỉnh độ rộng tối đa của novelTitle
        overflow: 'hidden', // Ẩn phần vượt quá độ rộng
    },
   
});