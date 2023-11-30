import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import getBookmarkedData from "../../hook/BookmarkedApi";
import { useEffect, useState, useContext, useCallback } from "react";
import { Bookmarked } from "../../models/Bookmarked";
import { AuthContext } from "../../context/AuthContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chapter } from "../../models/Chapter";
import { getChapterByChapterId } from "../../hook/ChapterApi";
const BookmarkNovels = () => {
    // const authContext = useContext(AuthContext);
    const { authState, getUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isGrid, setIsGrid] = useState(true);
    const [bookmarkedData, setBookmarkedData] = useState<Bookmarked[]>([]);
    const user = getUserData();
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [chapter, setChapter] = useState<Chapter>();
    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };
    const navigation = useNavigation();
    // const clearAsyncStorage = async () => {
    //     try {
    //         await AsyncStorage.clear();
    //         console.log('AsyncStorage cleared successfully.');
    //     } catch (error) {
    //         console.error('Error clearing AsyncStorage:', error);
    //     }
    // };

    // // Gọi hàm để xóa tất cả dữ liệu
    // clearAsyncStorage();
    useEffect(() => {
        const getChapter = async () => {
            bookmarkedData.map((novel, index) => {
                getChapterByChapterId(novel.chapterId).then((chapter) => {
                    // console.log('Chapter', chapter)
                    novel.chapterIndex = chapter.chapIndex;
                }
                );
            })

        }
        getChapter();
    });

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    if (authState.authenticated) {
                        const data = await getBookmarkedData(user, authState.accessToken);
                        setBookmarkedData(data);
                        // console.log(data); // Log the updated preferenceData
                    } else {
                        console.log("get bookmark from AsyncStorage");
                        const storedData = await AsyncStorage.getItem('bookmarkList');
                        if (storedData) {
                            const parsedData = JSON.parse(storedData);
                            setBookmarkedData(parsedData); // add this array to understand
                            // console.log('hêllo', parsedData.length);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            const getChapter = async () => {
                bookmarkedData.map((novel, index) => {
                    getChapterByChapterId(novel.chapterId).then((chapter) => {
                        // console.log('Chapter', chapter)
                        novel.chapterIndex = chapter.chapIndex;
                    }
                    );
                })
    
            }
            getChapter();

            fetchData();

            return () => {
                // Cleanup or clear any subscriptions if needed
            };
        }, [authState.authenticated, user])
    );

    if (bookmarkedData.length == 0) {
        return (
            <View style={styles.nodataContainer} >
                <Image source={require('../../assets/img/nodatapresent.png')} style={{ height: 100, width: 100 }} />
                <Text style={styles.warningText}>Không có dữ liệu</Text>
            </View>
        );
    }
    return (
        <View style={styles.mycontainer} >
            <View style={styles.row}>
                {bookmarkedData.map((novel, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        console.log('Press to novel detail');
                        navigation.navigate('NovelDetail', { novelId: novel.novelId, title: novel.name });
                    }}>
                        <View style={styles.novelContainer} >
                            <Image source={{ uri: novel.imagesURL }} alt='image' style={styles.novelImage} />
                            <View style={styles.novelContent}>
                                <Text numberOfLines={1} style={styles.novelTitle}>{novel.name}</Text>
                                <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
                                <Text numberOfLines={1} style={styles.novelGenre}>{novel.chapterIndex}/{novel.numChapter}</Text>
                            </View>
                            <Icon.Button name='plus-box' size={24} color="black" backgroundColor="transparent" />
                        </View>
                    </TouchableOpacity>
                ))
                }
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10,
        width: '100%',
    },
    mycontainer: {
        // flex: 1,
        flex: 1,
        margin: 10,
        width: '100%',

    },
    nodataContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningText: {
        fontSize: 20,
        textAlign: "center",
        color: 'black',

    },
    row: {
        flexDirection: 'row',
    },
    novelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        width: '100%',
    },
    novelContent: {
        // flex: 1,
        flexDirection: 'column',
    },
    novelImage: {
        width: 100,
        height: 120,
        marginRight: 10,
    },
    novelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    }, novelTag: {
        fontSize: 22,
        color: 'black',
    },
    novelAuthor: {
        fontSize: 14,
        color: 'black',
    },
    novelGenre: {
        fontSize: 16,
        color: 'black',
    },

});

export default BookmarkNovels;
