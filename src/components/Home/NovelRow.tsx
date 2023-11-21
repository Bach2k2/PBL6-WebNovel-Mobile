import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Novel } from '../../models/Novel';
import { useNavigation } from '@react-navigation/native';
import NovelRowSkeleton from '../Loading/NovelRowSkeleton';
export default function NovelRow({ novelData }: { novelData: Novel[] }) {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [novels, setNovels] = useState<Novel[]>([]);// Initial with null array
    useEffect(() => {
        // Simulate data loading delay (replace with your actual data fetching logic)
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setNovels(novelData);
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

    if (loading) {
        return (
            <NovelRowSkeleton />
        );

    }
    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <Text style={{ color: "black", fontSize: 24, }}>Top Trending</Text>
            </View>

            <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
                {novelData.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        navigation.navigate('NovelDetail', { novelId: item.id,title: item.name });
                    }}>
                        <View key={index}>
                            {item.imagesURL ? (<Image source={{ uri: item.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.prefer_image} />) :
                                (<Image source={require('../../assets/img/waiting_img.jpg')} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.prefer_image} />)}
                            <View style={styles.textContainer}>
                                <Text numberOfLines={2} style={styles.text_imgrow}>{item.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    // Reading Preferences
    container: {
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#fff',
        width: '95%',
    },
    headerTitle: {
        marginLeft: 10,
        marginTop: 10

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