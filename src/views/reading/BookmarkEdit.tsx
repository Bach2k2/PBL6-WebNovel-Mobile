import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { Bookmarked } from '../../models/Bookmarked';
import getBookmarkedData, { deleteBookmarkApi } from '../../hook/BookmarkedApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookmarkEdit = ({ navigation }: any) => {
    const { authState, getUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isGrid, setIsGrid] = useState(true);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    // State to manage the checked status of each novel
    const [bookmarkData, setBookmarkData] = useState<Bookmarked[]>([]);
    const user = getUserData();
    const [checkedNovels, setCheckedNovels] = useState<{ [key: string]: boolean }>({});
    const handleCheckboxPress = (novelId: string) => {
        setCheckedNovels((prevCheckedNovels) => ({
            ...prevCheckedNovels,
            [novelId]: !prevCheckedNovels[novelId],
        }));
    };

    useEffect(() => {
        navigation.setOptions({
            header: () => <CustomEditHeader />,
        });
    }, [navigation]);


    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    if (authState.authenticated) {
                        console.log("call api preference");
                        const data = await getBookmarkedData(user, authState.accessToken);
                        setBookmarkData(data);
                        console.log(data); // Log the updated preferenceData
                    } else {
                        console.log("get preferList from AsyncStorage");
                        const storedData = await AsyncStorage.getItem('bookmarkList');
                        if (storedData) {
                            const parsedData = JSON.parse(storedData);
                            setBookmarkData(parsedData); // add this array to understand
                            // console.log(parsedData.length);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();

            return () => {
                // Cleanup or clear any subscriptions if needed
            };
        }, [authState.authenticated, user])
    );

    const handleSelectAll = () => {
        bookmarkData.map((bookmark) => {
            handleCheckboxPress(bookmark.novelId);
        })
    }
    const handleDeleteBookmark = async (novelId: string) => {
        if (user) {
            const res = await deleteBookmarkApi(user.id, novelId, authState.accessToken);
            console.log(res);
        } else {
            console.log("Chua dang nhap");
            bookmarkData.filter((bookmark) => bookmark.novelId !== novelId);
            const parsedData = JSON.stringify(bookmarkData);
            await AsyncStorage.setItem('preferList', parsedData);
            console.log("Da cap nhat")
        }

    }
    const deleteBookmark = () => {
        console.log('delete')
        Object.keys(checkedNovels).map((novelId) => {
            handleDeleteBookmark(novelId);
        })
        forceUpdate();
        
    }

    const CustomEditHeader = () => {
        return (
            <View
                style={styles.header}
            >
                <View style={styles.closeButton}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="window-close" size={25} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Chọn mục</Text>
            </View>

        );
    };


    const renderRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {bookmarkData.slice(row * 3, (row + 1) * 3).map((item, index) => (
                    <View
                        key={index}
                        style={styles.itemContainer}
                    >
                        <TouchableOpacity style={styles.checkbox} onPress={() => handleCheckboxPress(item.novelId)}><Checkbox
                            status={checkedNovels[item.novelId] ? 'checked' : 'unchecked'}
                        /></TouchableOpacity>

                        <Image source={{ uri: item.imagesURL }} style={styles.image} />
                        <Text numberOfLines={1} style={styles.text}>
                            {item.name}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <ScrollView style={{ position: 'relative' }}>
                <View>{Array.from({ length: Math.ceil(bookmarkData.length / 3) }, (_, i) => renderRow(i))}</View>
            </ScrollView>
            <View style={styles.functionButtons}>
                <TouchableOpacity style={styles.buttonSelect} onPress={() => {
                    handleSelectAll();
                }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Select All</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDelete} onPress={() => {
                    deleteBookmark();
                }} >
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BookmarkEdit

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
        // position:'relative',
    },
    headerText: {
        flex: 0.6,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    closeButton: {
        flex: 0.4,
        marginLeft: 10, // Add some margin if needed
    },
    container: {
        width: '100%',
        alignItems: 'stretch',
        height: '100%',
        position: 'relative',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    itemContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        flexDirection: 'column',
        position: 'relative',
    },
    image: {
        width: 90,
        height: 120,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black'
    },
    text: {
        marginTop: 5,
        textAlign: 'center',
    },
    checkbox: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
    functionButtons: {
        borderRadius: 10,
        position: 'absolute',
        bottom: 30,
        marginBottom: 'auto',
        flexDirection: 'row',
        backgroundColor: '#23F4DC',
        justifyContent: 'space-around',
        // alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        top: 'auto',
        // padding: 10,
    },
    buttonSelect: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        width: '50%',
    },
    buttonDelete: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderLeftWidth: 1, borderColor: '#EBEBEB'
    }

})