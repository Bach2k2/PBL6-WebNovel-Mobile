import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
export default function NovelRow() {
    // const images = [ /* Array of image sources */ ];
    const images = [
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'A stack attributes' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 2' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 3' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 4' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 5' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 6' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 7' },
        { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 8' },
    ];
    return (
        <>
            <View style={{
                backgroundColor: 'lightblue',
                padding: 12,
            }}>
                <Text style={{ color: "black", fontSize: 24, }}>Top Trending</Text>
            </View>
            {/* <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView> */}
            <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
                {images.map((item, index) => (
                    <View key={index}>
                        {item.image ? <Image source={{ uri: item.image }} style={styles.prefer_image} />
                            : <Skeleton style={styles.prefer_image} />}
                        <View style={styles.textContainer}>
                            {item.text ?
                                <Text numberOfLines={2} style={styles.text_imgrow}>{item.text}</Text> :
                                <Skeleton style={styles.text_imgrow} />
                            }
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    // Reading Preferences
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