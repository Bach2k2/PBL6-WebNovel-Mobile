import React, { useState, useEffect } from 'react';
import {
    Image, Text, View, Button, StyleSheet, Animated, Dimensions
} from 'react-native';
import { Novel } from '../../models/Novel';
import Skeleton from './Skeleton';
// Phần để recommend truyện
const width = Math.floor(Dimensions.get("window").width);
const NovelRowSkeleton = () => {

    return (
        <View style={styles.gridContainer}>
            <View style={{
                marginLeft: 10,
                marginTop: 10,
            }}>
                <Skeleton height={30} width={width} style={{ borderRadius: 5, marginBottom: 5 }} />
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    {Array.from({ length: 5 }, (_, colIndex) => (
                        <View style={styles.column} key={colIndex}>
                            <Skeleton height={100} width={70} style={{ borderRadius: 5, marginBottom: 5 }} />
                            <Skeleton height={20} width={70} style={{ borderRadius: 5, marginBottom: 5 }} />
                        </View>
                    ))}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    // for the rmd -bookmark
    gridContainer: {
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#fff',

    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    column: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },

    placeholderImage: {
        width: 70,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#ccc',
    },
    placeholderText: {
        marginTop: 5,
        textAlign: 'center',
        width: 70,
        height: 20,
        backgroundColor: '#ccc',
    },
});

export default NovelRowSkeleton;