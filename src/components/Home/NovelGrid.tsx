import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';
import Skeleton from 'react-loading-skeleton';
import NovelGridSkeleton from '../Loading/NovelGridSkeleton';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../models/User';
import { AuthContext } from '../../context/AuthContext';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../../theme/theme';
// Phần để recommend truyện
const NovelGrid = ({ novelData }: any) => {
    const navigation = useNavigation();
    const [novels, setNovels] = useState<Novel[]>([]);// Initial with null array
    const [loading, setLoading] = useState(true);
    const [visibleNovelWeekly, setVisibleNovelWeekly] = useState(8);
    const [displayedNovels, setDisplayedNovels] = useState<Novel[]>([]);

    const [user, setUser] = useState<User | null>()
    const { getUserData } = useContext(AuthContext)

    useEffect(() => {
        setUser(getUserData());
    }, [user])
    useEffect(() => {
        // Simulate data loading delay (replace with your actual data fetching logic)
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setNovels(novelData);
            setDisplayedNovels(novelData.slice(0, visibleNovelWeekly));
            if (novelData.length > 0) {
                setLoading(false);
            } else {
                setLoading(true);
            }
        };
        fetchData();
    }, [novelData]);

    // đọc thêm
    function shuffleArray(array: any) {
        // Tạo một bản sao của mảng để không ảnh hưởng đến mảng gốc
        const shuffledArray = [...array];

        // Thuật toán Fisher-Yates (Knuth) để random mảng
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }

    // Hàm dùng đê random truyện
    const loadMoreNovels = () => {
        const availableNovels = novelData.filter((novel: any) => !displayedNovels.includes(novel));
        const randomNovels = shuffleArray(availableNovels);
        setDisplayedNovels(randomNovels.slice(0, 8));
    };

    const renderRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {displayedNovels.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        <TouchableOpacity style={styles.itemWrapper} onPress={() => {
                            navigation.navigate('NovelDetail', { novelId: item.id, title: item.name });
                        }}>
                            <View style={styles.itemWrapper}>
                                <Image source={{ uri: item.imagesURL }} style={styles.image} />
                                <Text numberOfLines={2} style={styles.normalTitle}>{item.name}</Text>
                                <Text style={styles.subTitle}>{item.genreName[0]}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    const renderNovels = () => {
        if (loading) {
            return (<NovelGridSkeleton />);
        }
        // if(user){

        // }
        return (
            <View style={styles.gridContainer}>
                <View style={{
                    marginLeft: 10,
                    marginTop: 10,
                }}>
                    <Text style={styles.headerTitle}>Weekly Feature</Text>
                </View>
                <View style={styles.rcm_container}>
                    {Array.from({ length: Math.ceil(visibleNovelWeekly / 4) }, (_, i) => renderRow(i))}
                </View>

                <View style={styles.loadingContainer}>
                    <TouchableOpacity onPress={loadMoreNovels} style={styles.btnLoadingMore}
                        disabled={novelData.length < visibleNovelWeekly}>
                        <Text style={styles.loadingText}>Load More</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
    return renderNovels();
}

const styles = StyleSheet.create({
    // for the rmd -bookmark
    gridContainer: {
        flex: 1,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryWhiteHex,
        width: '96%',
    },
    rcm_container: {    // render for row
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.space_10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    column: {
        marginLeft: SPACING.space_10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    itemWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: BORDERRADIUS.radius_4,
    },
    headerTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
        textAlign: 'left',
        overflow: 'hidden',
        fontWeight:'700',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // height: SPACING.space_32,
    },
    loadingText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
        textAlign: 'center', // Căn giữa văn bản
    },
    btnLoadingMore: {
        flex: 1,
        backgroundColor: COLORS.primaryGreenHex,
        width: '90%',
        color: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_8,
        marginTop: SPACING.space_10,
        marginBottom: SPACING.space_10,
        paddingTop:SPACING.space_10,
        paddingBottom:SPACING.space_10,
        justifyContent: 'center',
        alignItem: 'center',
    }
});

export default NovelGrid;