import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';
import { useNavigation } from '@react-navigation/native';
import NovelRowSkeleton from '../Loading/NovelRowSkeleton';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../../theme/theme';

export default function NovelRow({ novelData }: { novelData: Novel[] }) {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [novels, setNovels] = useState<Novel[]>([]);// Initial with null array
    useEffect(() => {
        // Simulate data loading delay (replace with your actual data fetching logic)
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setNovels(novelData);
            if (novelData.length > 0) {
                setLoading(false);
            } else {
                setLoading(true);
            }
        };
        fetchData();
    }, [novelData]);

    if (loading) {
        return (
            <NovelRowSkeleton />
        );

    }
    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>Top Trending</Text>
            </View>
            <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
                {novelData.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        navigation.navigate('NovelDetail', { novelId: item.id, title: item.name });
                    }}>
                        <View key={index} style={styles.itemWrap}>
                            {item.imagesURL ? (<Image source={{ uri: item.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.preferImage} />) :
                                (<Image source={require('../../assets/img/waiting_img.jpg')} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.preferImage} />)}
                            <View style={styles.textContainer}>
                                <Text numberOfLines={2} style={styles.normalTitle}>{item.name}</Text>
                                <Text style={styles.subTitle}>{item.genreName[0]}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    // Reading Preferences
    container: {
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#fff',
        width: '95%',
    },
    headerTitle: {
        marginLeft: 10,
        marginTop: 10
    },
    headerText: {
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
    imageRow: {
        flexDirection: 'row',
        marginLeft: SPACING.space_10,
        marginTop: SPACING.space_10,
        marginBottom: SPACING.space_10
    },
    itemWrap: {

    },
    preferImage: {
        margin: 5,
        width: 80,
        height: 110,
        borderRadius: BORDERRADIUS.radius_4,
    },
    textContainer: {
        width: 70,
        marginLeft: 7
    },
    text_imgrow: {
        marginTop: 5,
        textAlign: 'left',
        fontSize: 14,
    },
});