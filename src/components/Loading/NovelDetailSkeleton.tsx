import React, { useState, useEffect, useRef } from 'react';
import Skeleton from './Skeleton';
import {
    View, StyleSheet, Animated, Dimensions
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const windowWidth = Math.floor(Dimensions.get('window').width);

const NovelDetailSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.imgContainer}>
                    <Skeleton width={windowWidth * 0.3} height={200} style={styles.imgNovel} />
                </View>
                <View style={styles.inforColumn}>
                    <Skeleton width={windowWidth * 0.6} height={20} style={styles.nameInfor} />
                    <Skeleton width={windowWidth * 0.3} height={20} style={styles.subNameInfor} />
                    <Skeleton width={windowWidth * 0.6} height={20} style={styles.authorInfor} />
                    <Skeleton width={windowWidth * 0.6} height={20} style={styles.genreInfor} />
                </View>
            </View>
            <View style={styles.viewrow}>
                <View style={styles.column}>
                    <Skeleton width={70} height={20} style={{ marginTop: 10, marginBottom: 10 }} />
                    <Skeleton width={110} height={20} style={{ marginBottom: 10 }} />
                </View>
                <View style={styles.column}>
                    <Skeleton width={70} height={20} style={{ marginTop: 10, marginBottom: 10 }} />
                    <Skeleton width={110} height={20} style={{ marginBottom: 10 }} />
                </View>
            </View>

            <View style={styles.descBox}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Skeleton width={100} height={20} style={{ marginTop: 10, marginBottom: 10 }} />
                        <Skeleton width={windowWidth * 0.9} height={20} style={{ marginTop: 10, marginBottom: 10, borderRadius: 15 }} />
                        <Skeleton width={windowWidth * 0.9} height={20} style={{ marginBottom: 10, borderRadius: 15 }} />
                        <Skeleton width={windowWidth * 0.7} height={20} style={{ marginLeft: 10, alignSelf: 'flex-start', marginBottom: 10, borderRadius: 15 }} />
                    </View>
                </View>

                <View style={styles.separator}>
                    <View style={styles.separatorLine}></View>
                </View>

                <View style={styles.row}>
                    <Skeleton width={windowWidth * 0.6} height={20} style={{ margin: 10 }} />
                </View>
                <View style={styles.row}>
                    <Skeleton width={windowWidth * 0.3} height={20} style={{ marginLeft: 10, marginBottom: 10 }} />
                </View>
            </View>
            <View style={styles.descBox}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Skeleton width={100} height={20} style={{ marginTop: 10, marginBottom: 10 }} />
                        <Skeleton width={windowWidth * 0.9} height={20} style={{ marginTop: 10, marginBottom: 10, borderRadius: 15 }} />
                    </View>
                </View>

                <View style={styles.separator}>
                    <View style={styles.separatorLine}></View>
                </View>

                <View style={styles.row}>
                    <Skeleton width={windowWidth * 0.6} height={20} style={{ margin: 10 }} />
                </View>
                <View style={styles.row}>
                    <Skeleton width={windowWidth * 0.3} height={20} style={{ marginLeft: 10, marginBottom: 10 }} />
                </View>
            </View>
        </View>
    );
}

export default NovelDetailSkeleton;

const styles = StyleSheet.create({
    // Reading Preferences
    container: {
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#fff',
        width: '100%',

    },
    row: {
        width: '100%',
        flexDirection: 'row',
        // 
    },
    imgContainer: {
        margin: 10,
        marginLeft: 17,
    },
    imgNovel: {
        // width: 100,
        // height: 30,
    },
    img: {
        width: 100,
        height: 100,
    },
    inforColumn: {
        width: 0.6 * windowWidth,
        marginLeft: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    // row with show view
    viewrow: {
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        // margin: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        marginLeft: 10,
    },
    descBox: {
        margin: 10,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
    },

    separator: {
        width: '100%',
        alignItems: 'center',
        margin: 5,
    },
    separatorLine: {
        width: '90%',
        height: 1, // Độ cao của đường line
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'gray', // Màu của đường line
    },

    nameInfor: {
        // height: 20,
        // width: 100,
        margin: 0,
        marginBottom: 5,
    },
    subNameInfor: {
        // height: 20,
        // width: 100,
        margin: 0,
        marginBottom: 10,
    },

    authorInfor: {
        // height: 20,
        // width: 100,
        marginBottom: 5,
    },
    genreInfor: {
        // height: 20,
        // width: 100,
        marginBottom: 5,
    },



    headerTitle: {
        marginLeft: 10,
        marginTop: 10,


    },
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
});
