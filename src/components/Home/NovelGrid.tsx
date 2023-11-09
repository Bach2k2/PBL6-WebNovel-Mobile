import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';
import Skeleton from 'react-loading-skeleton';

// Phần để recommend truyện
const NovelGrid = (props: any) => {
    const [novels, setNovelData] = useState<Novel[]>([]);// Initial with null array
    // const [isNull, setArrayStatus] = useState(true);
    // useEffect(() => {
    //     console.log("Novel data initial: " + props.novelData);
    //     (async () => {
    //         if (props.novelData == null) {
    //             console.log("Something is wrong");
    //             setArrayStatus(true);
    //             console.log(isNull)
    //         } else {
    //             setNovelData(props.novelData);
    //             console.log("Novel data: " + novels)
    //             setArrayStatus(false);
    //         }
    //     })

    // }, [props.novelData])
    const data = [
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'A stack attributes' },
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'Novel 2' },
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'Novel 3' },
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'Novel 4' },
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'Novel 5' },
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'Novel 6' },
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'Novel 7' },
        { imagesURL: 'https://picsum.photos/seed/picsum/200/300', name: 'Novel 8' },
    ];

    const renderRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {data.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        {
                            item.imagesURL ?
                                (<Image source={{ uri: item.imagesURL }} style={styles.image} />) :
                                (<Skeleton width={30} height={50} style={{ backgroundColor: 'gray' }} />)
                        }
                        {
                            item.name ?
                                (<Text style={styles.text}>{item.name}</Text>) :
                                (<Skeleton width={100} height={20} style={{ backgroundColor: 'gray' }} />)
                        }
                    </View>
                ))}
            </View>
        );

    };

    return (
        <>
            <View style={{
                backgroundColor: 'lightblue',
                padding: 12,
            }}>
                <Text style={{ color: "black", fontSize: 24, }}>Weekly Feature</Text>
            </View>
            <View style={styles.rcm_container}>
                {Array.from({ length: Math.ceil(novels.length / 4) }, (_, i) => renderRow(i))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
        width: 70,
        height: 100,
        borderRadius: 10,
    },
    text: {
        marginTop: 5,
        textAlign: 'center',
    },
});

export default NovelGrid;