import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';
import Skeleton from 'react-loading-skeleton';
import NovelGridSkeleton from '../Loading/NovelGridSkeleton';
// Phần để recommend truyện
const NovelGrid = ({ novelData }: { novelData: Novel[] }) => {
    const [novels, setNovels] = useState<Novel[]>([]);// Initial with null array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading delay (replace with your actual data fetching logic)
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setNovels(novelData);
            console.log('Fetching data');
            if (novelData.length > 0) {
                console.log("Fetch novel in novel grid successful");
                setLoading(false);
            }

        };

        fetchData();
    }, [novelData]);

    // useEffect(() => {
    //     setNovels(novelData);
    //     console.log("Novel data o novelGrid", novelData)
    //     if (novelData.length > 0) {
    //         console.log("Fetch successful 2")
    //         setLoading(false);
    //     }

    // }, [novelData]);

    // const renderSkeleton = () => {
    //     return (
    //         <View style={styles.gridContainer}>
    //             {[...Array(2)].map((_, rowIndex) => (
    //                 <View style={styles.row} key={rowIndex}>
    //                     {[...Array(4)].map((__, columnIndex) => (
    //                         <View style={styles.column} key={columnIndex}>
    //                             <Skeleton height={100} width={70} baseColor='red' highlightColor='blue' />
    //                             <Skeleton height={20} width={50} baseColor='red' highlightColor='blue' />
    //                         </View>
    //                     ))}
    //                 </View>
    //             ))}
    //         </View>
    //     );
    // };

    const renderRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {novelData.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        <Image source={{ uri: item.imagesURL }} style={styles.image} />
                        <Text style={styles.text}>{item.name}</Text>
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
                    backgroundColor: 'lightblue',
                    padding: 12,
                }}>
                    <Text style={{ color: "black", fontSize: 24, }}>Weekly Feature</Text>
                </View>
                <View style={styles.rcm_container}>
                    {Array.from({ length: Math.ceil(novelData.length / 4) }, (_, i) => renderRow(i))}
                </View>
            </View>
        );
    }
    return renderNovels();
}

const styles = StyleSheet.create({
    // for the rmd -bookmark
    gridContainer: {

    },
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
        width: 70,
        height: 100,
        borderRadius: 10,
    },
    text: {
        marginTop: 5,
        textAlign: 'center',
    },
    loadingContainer: {
    },
});

export default NovelGrid;