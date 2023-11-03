import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';

// Phần để recommend truyện
const NovelGrid = (novelData: any) => {
    useEffect(()=>{
        console.log(novelData);
    },[novelData])
    const data = [
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'A stack attributes' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 2' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 3' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 4' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 5' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 6' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 7' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 8' },
    ];

    const renderRow = (row: number) => (
        <View style={styles.row} key={row}>
            {data.slice(row * 4, (row + 1) * 4).map((item, index) => (
                <View style={styles.column} key={index}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <>
            <View style={{
                backgroundColor: 'lightblue',
                padding: 12,
            }}>
                <Text style={{ color: "black", fontSize: 24, }}>Weekly Feature</Text>
            </View>
            <View style={styles.rcm_container}>
                {Array.from({ length: Math.ceil(data.length / 4) }, (_, i) => renderRow(i))}
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