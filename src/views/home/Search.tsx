import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Novel } from '../../models/Novel';
import { searchNovelByKey } from '../../hook/NovelApi';
import { ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Search = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [novelSearch, setNovelSearch] = useState<Novel[]>([])
    const [searchQuery, setSearchQuery] = useState("");

    // const updateSearch = (search: string) => {
    //     setSearch(search);
    // };
    const handleAddToLib = () => {

    }
    useEffect(() => {
        navigation.setOptions({
            title: '',
        });
    });

    useEffect(() => {
        if (searchQuery == "") {
            setIsLoading(false);
        } else {
            setIsLoading(true);
            fetchData();
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 10000); // 10 seconds timeout
            return () => clearTimeout(timeout);
        }

    }, [searchQuery])
    const fetchData = async () => {
        console.log(searchQuery);
        if (searchQuery == "") return;
        const data = await searchNovelByKey(searchQuery);
        setNovelSearch(data);
        setIsLoading(false);
    }
    const handleSearch = async (query: string) => {
        setSearchQuery(query)
    }
    // if (isLoading) {
    //     return (
    // <View>
    //     <ActivityIndicator size={'large'} color="#5500dc" />
    // </View>
    //     )
    // }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginVertical: 10, width: '95%', borderRadius: 10, marginRight: 10, }}>
                <View style={{ position: 'absolute', zIndex: 1, left: 15, top: 16 }}>
                    <MaterialIcons name="search" size={24} color="black" />
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder='Search for novels'
                    onChangeText={(searchQuery) => handleSearch(searchQuery)}
                    clearButtonMode='always'
                    autoCorrect={false}
                    value={searchQuery}
                />
            </View>

            {isLoading ? (
                <View style={[styles.resultContainer, { justifyContent: 'center' }]}>
                    <ActivityIndicator size={'large'} color="#5500dc" />
                </View>
            ) : (
                <ScrollView style={styles.resultContainer}>
                    {novelSearch.length > 0 ? (
                        novelSearch.map((novel, index) => (
                            <TouchableOpacity key={index} onPress={() => {
                                navigation.navigate('NovelDetail',{novelId:novel.id})
                            }}>
                                <View style={styles.row}>
                                    <View>
                                        <Image source={{ uri: novel.imagesURL }} style={{ height: 100, width: 70 }} />
                                    </View>
                                    <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                        <Text style={styles.headerText}>{novel.name}</Text>
                                        <Text style={styles.normalText}>{novel.author}</Text>
                                        <Text style={styles.normalText}>{novel.genreName[0]}</Text>
                                    </View>

                                    <View style={{ marginLeft: 'auto', right: 10, justifyContent: 'center' }}>
                                        <Pressable onPress={() => { handleAddToLib() }}>
                                            <MaterialIcons name='add-box' size={25} />
                                        </Pressable>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.row}>
                            <Text style={styles.normalText}>No results found</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    subContainer: {
        flex: 1,
        margin: 10,
        borderRadius: 5,
        backgroundColor: 'red'
    },
    searchBar: {
        // top:0,
        width: '95%',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginLeft: 30,
    },
    // textInput
    //result:
    resultContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '95%',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        minHeight: 100
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        margin: 10,
    },
    headerText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '600'
    },
    normalText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'left',
    }
})