import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';
import Skeleton from 'react-loading-skeleton';
import NovelGridSkeleton from '../Loading/NovelGridSkeleton';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../models/User';
import { AuthContext } from '../../context/AuthContext';
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
                                <Text numberOfLines={2} style={styles.normalText}>{item.name}</Text>

                            </View>
                            <View>
                                <Text style={styles.subText}>{item.genreName[0]}</Text>
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
        margin: 5,
        width: '95%',
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
        justifyContent: 'flex-start', // căn chỉnh theo chiều dọc
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
    normalText: {
        color: 'black',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'left',
        overflow: 'hidden',
    },
    subText: {
        marginTop: 5,
        fontSize: 14,
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