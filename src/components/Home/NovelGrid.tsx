import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';
import Skeleton from 'react-loading-skeleton';
import NovelGridSkeleton from '../Loading/NovelGridSkeleton';
import { useNavigation } from '@react-navigation/native';
// Phần để recommend truyện
const NovelGrid = ({ novelData }: { novelData: Novel[] }) => {
    const navigation = useNavigation();
    const [novels, setNovels] = useState<Novel[]>([]);// Initial with null array
    const [loading, setLoading] = useState(true);
    const [visibleNovelWeekly, setVisibleNovelWeekly] = useState(8);
    const [displayedNovels, setDisplayedNovels] = useState<Novel[]>([]);


    useEffect(() => {
        // Simulate data loading delay (replace with your actual data fetching logic)
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setNovels(novelData);
            setDisplayedNovels(novelData.slice(0, visibleNovelWeekly));
            console.log('Fetching data');
            if (novelData.length > 0) {
                console.log("Fetch novel in novel grid haha successful");
                setLoading(false);
            } else {
                console.log("No data here");
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
        const availableNovels = novelData.filter(novel => !displayedNovels.includes(novel));
        const randomNovels = shuffleArray(availableNovels);
        setDisplayedNovels(randomNovels.slice(0, 8));
    };

    const renderRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {displayedNovels.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        <TouchableOpacity style={styles.itemWrapper} onPress={() => {
                            navigation.navigate('NovelDetail', { novelId: item.id });
                        }}>
                            <View style={styles.itemWrapper}>
                                <Image source={{ uri: item.imagesURL }} style={styles.image} />
                                <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
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
        return (
            <View style={styles.gridContainer}>
                <View style={{
                    marginLeft: 10,
                    marginTop: 10,
                }}>
                    <Text style={{ color: "black", fontSize: 24, }}>Weekly Feature</Text>
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
        borderRadius: 10,
        backgroundColor: '#fff',
        margin:5,
        width:'100%',
    },
    // render for row
    rcm_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    column: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '30%', // Adjust for card
    },
    itemWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    image: {
        width: 70,
        height: 100,
        borderRadius: 3,
    },
    text: {
        marginTop: 5,
        textAlign: 'left',
        overflow: 'hidden',

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center', // Căn giữa văn bản
        lineHeight: 30,
    },
    btnLoadingMore: {
        flex: 1,
        backgroundColor: '#6c757d',
        width: '90%',
        height: 40,
        color: '#fff',
        justifyContent: 'center',
        alignItem: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    }
});

export default NovelGrid;