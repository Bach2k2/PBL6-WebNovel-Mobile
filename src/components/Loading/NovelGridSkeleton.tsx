import React, { useState, useEffect } from 'react';
import {
    Image, Text, View, Button, StyleSheet, Animated, Dimensions
} from 'react-native';
import { Novel } from '../../models/Novel';
import Skeleton from './Skeleton';
// Phần để recommend truyện
const widthWindow  = Math.floor(Dimensions.get("window").width);
const NovelGridSkeleton = () => {
    return (
        <View style={styles.gridContainer}>
            <View style={{
                marginLeft: 10,
                marginTop: 10,
            }}>
                <Skeleton height={30} width={widthWindow} style={{ borderRadius: 5, marginBottom: 5 }} />
            </View>
            <View style={styles.container}>
                {Array.from({ length: 2 }, (_, rowIndex) => (
                    <View style={styles.row} key={rowIndex}>

                        {Array.from({ length: 4 }, (_, colIndex) => (
                            <View style={styles.column} key={colIndex}>
                                <Skeleton height={100} width={70} style={{ borderRadius: 5, marginBottom: 5 }} />
                                <Skeleton height={20} width={70} style={{ borderRadius: 5, marginBottom: 5 }} />
                            </View>
                        ))}
                    </View>
                ))}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
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

export default NovelGridSkeleton;