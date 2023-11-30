import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Novel } from '../../models/Novel';
import { searchNovelByKey } from '../../hook/NovelApi';
import { ActivityIndicator } from 'react-native';
;

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [novelSearch, setNovelSearch] = useState<Novel[]>([])
    const [searchQuery, setSearchQuery] = useState("");

    // const updateSearch = (search: string) => {
    //     setSearch(search);
    // };
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
            <TextInput
                style={styles.searchBar}
                placeholder='Search for stories'
                onChangeText={(searchQuery) => handleSearch(searchQuery)}
                clearButtonMode='always'
                autoCorrect={false}
                value={searchQuery}
            />
            {isLoading ? (
                <View style={[styles.resultContainer, { justifyContent: 'center' }]}>
                    <ActivityIndicator size={'large'} color="#5500dc" />
                </View>
            ) : (
                <ScrollView style={styles.resultContainer}>
                    {novelSearch.length > 0 ? (
                        novelSearch.map((novel, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.normalText}>{novel.name}</Text>
                            </View>
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
        justifyContent: 'center',
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
    normalText: {
        fontSize: 16,
        textAlign: 'left',
    }
})