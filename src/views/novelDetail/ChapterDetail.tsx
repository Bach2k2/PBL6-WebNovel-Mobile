import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, ToastAndroid, Text, StatusBar, Pressable, Image } from "react-native";
import Pdf from 'react-native-pdf';
import { Chapter } from "../../models/Chapter";
import { getChapterByChapterId, getChaptersByNovelId } from "../../hook/ChapterApi";
import getBookmarkedData, { postBookmarkData, putBookmarkData } from "../../hook/BookmarkedApi";
import { AuthContext } from "../../context/AuthContext";
import { Bookmarked } from "../../models/Bookmarked";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
// import BottomSheet from "../../components/BottomSheet/CustomBottomSheet";
import BottomSheet from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();


const ChapterDetail = ({ navigation, route }: any) => {
    const [chapter, setChapter] = useState<Chapter>();
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfArray, setPdfArray] = useState<JSX.Element[]>([]);
    const { novel, chapterId } = route.params;
    const { authState, getUserData } = useContext(AuthContext);
    const user = getUserData();
    const [bookmarkList, setBookmarkList] = useState<Bookmarked[]>([]);
    const [loadingBookmark, setLoadingBookmark] = useState(true);

    const [isFirstChapter, setIsFirstChapter] = useState(false);
    const [isLastChapter, setIsLastChapter] = useState(false);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['5%', '25%', '50%'], []);
    // useEffect(() => {

    // },[chapter]);
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // fetch bookmark
    const fetchData = async () => {
        try {
            if (authState.authenticated) {
                console.log("call api bookmark");
                const data = await getBookmarkedData(user, authState.accessToken);
                setBookmarkList(data);
                setLoadingBookmark(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchChapterById = async () => {
            try {
                const data = await getChapterByChapterId(chapterId);
                // console.log("chapter Response:", data);
                setChapter(data);

                if (data) {
                    navigation.setOptions({
                        title: '',
                        headerStyle: {
                            backgroundColor: '#EBEBEB',
                        },
                        headerLeft: () => (
                            <TouchableOpacity style={{ alignItems: 'center', marginRight: 10, flexDirection: 'row' }} onPress={() => { navigation.navigate('NovelDetail', { title: novel.title }); }}>
                                <MaterialCommunityIcons name="chevron-left-circle" color='gray' size={20} />
                                <Text style={{ color: 'black' }}>{data?.name}</Text>
                            </TouchableOpacity>
                        ),
                    });
                }
                if (data.fileContent === undefined) {
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setNumOfPages(1); // Assuming the file has only one page initially
                    setPdfArray([renderPdf(1, data.fileContent)]);
                }
                // Check novel display first chapter{
                // Check if it's the first or last chapter
                setIsFirstChapter(chapter?.chapIndex === 1);
                setIsLastChapter(chapter?.chapIndex === novel.numChapter);

            } catch (error) {
                console.error(error);
            }
        };
        const fetchChapters = async () => {
            try {
                const data = await getChaptersByNovelId(novel.id);
                setChapters(data);;
            } catch (error) {
                console.log(error);
            }
        }

        fetchChapterById();
        fetchChapters();
    }, [chapterId, novel.id, chapter]);


    // Add bookmarked of chapter:
    useEffect(() => {
        const addToBookmark = async () => {
            if (authState.authenticated) {

                const bmList = await getBookmarkedData(user, authState.accessToken);
                if (
                    bmList &&
                    bmList.some((item: any) => item.novelId == novel.id && item.accountId == user.id)
                ) {
                    if (bmList.some((item: any) => item.chapterId != chapterId)) {
                        console.log('Call put')
                        const res = await putBookmarkData(user.id, novel.id, chapterId, authState.accessToken);
                        console.log(res);
                    }
                } else {
                    console.log('bm', bmList)
                    const res = await postBookmarkData(user.id, novel.id, chapterId, authState.accessToken);
                    console.log(res);

                }
            } else {
                const newBookmark = {
                    novelId: novel.id,
                    chapterId: chapterId,
                    chapterIndex: 0,
                    accountId: '',
                    name: novel.name,
                    title: novel.title,
                    author: novel.author,
                    year: novel.year,
                    views: novel.views,
                    rating: novel.rating,
                    imagesURL: novel.imagesURL,
                    genreName: novel.genreName,
                    genreIds: novel.genreIds,
                    description: novel.description,
                    status: novel.status,
                    approvalStatus: novel.approvalStatus,
                    numChapter: novel.numChapter
                };
                console.log(bookmarkList);
                if (
                    bookmarkList &&
                    bookmarkList.some(item => item.novelId === novel.id)
                ) {
                    console.log("Mảng chứa phần tử có cả novelId và accountId đều bằng với giá trị cần kiểm tra");
                } else {

                    console.log("Mảng không chứa phần tử thỏa mãn điều kiện hoặc Bookmark không tồn tại");
                    try {
                        // setBookmarkList([...bookmarkList, newBookmark]);
                        setBookmarkList(prevList => [...prevList, newBookmark]); // Use the callback form
                        // Lưu danh sách mới vào AsyncStorage
                        console.log("AsyncStorage add")
                        console.log(bookmarkList)
                        await AsyncStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));

                        console.log("get bookmark from AsyncStorage");
                        const storedData = await AsyncStorage.getItem('bookmarkList');
                        console.log(storedData)
                    } catch (error) {
                        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);

                    }
                }
            }
        }
        addToBookmark();
    }, []);

    const handlePageChange = (page: number, numberOfPages: number) => {
        console.log(`Current page: ${page}`);
        setCurrentPage(page);
    };

    const renderPdf = (page: number, uri: string) => {
        return (
            <Pdf
                trustAllCerts={false}
                key={page}
                source={{ uri: uri, cache: true }}
                page={page}
                onLoadComplete={(numberOfPages) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                    setNumOfPages(numberOfPages);
                }}
                onPageChanged={handlePageChange}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
        );
    };

    const renderPages = () => {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const page = Math.ceil(offsetX / Dimensions.get('window').width) + 1000;
                    setCurrentPage(page);
                }}
            >
                {pdfArray}
            </ScrollView>
        );
    };

    const changePreviousChapter = () => {
        try {
            const previousChapter = chapters.find(c => c.chapIndex === chapter?.chapIndex - 1);
            if (previousChapter) {
                navigation.replace('ChapterDetail', { chapterId: previousChapter.id, novel: novel });
            } else {
                console.log('Previous chapter not found');
            }
        } catch (e) {
            console.error('Error navigating to previous chapter', e);
        }
    }

    const changeNextChapter = () => {
        try {
            const nextChapter = chapters.find(c => c.chapIndex === chapter?.chapIndex + 1);
            if (nextChapter) {
                navigation.replace('ChapterDetail', { chapterId: nextChapter.id, novel: novel });
            } else {
                console.log('Next chapter not found');
            }
        } catch (e) {
            console.error('Error navigating to next chapter', e);
        }
    }

    const DrawerNavigator = () => {
        return (
          <Drawer.Navigator>
            {chapters.map((chapter, index) => (
              <Drawer.Screen
                key={index}
                name={chapter.name}
                component={ChapterDetail}
                initialParams={{ chapterId: chapter.id, novel: novel }}
              />
            ))}
          </Drawer.Navigator>
        );
      };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return <View style={styles.container}>
        {renderPages()}
        {/* <StatusBar></StatusBar> */}
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#333', fontSize: 22 }}>Control Panel</Text>
                    </View>
                    <View style={styles.panel}>
                        <Pressable disabled={isFirstChapter} onPress={() => changePreviousChapter()}>
                            <MaterialCommunityIcons name="chevron-left-circle-outline" size={22} style={isFirstChapter ? { color: 'gray' } : { color: '#333' }} />
                        </Pressable>

                        <Text numberOfLines={2} style={{ color: '#333', fontSize: 18, alignSelf: 'center', width: '70%', textAlign: 'center' }}>{chapter?.chapIndex}.{chapter?.name}</Text>
                        <Pressable disabled={isLastChapter} onPress={() => changeNextChapter()}>
                            <MaterialCommunityIcons name="chevron-right-circle-outline" size={22} style={isLastChapter ? { color: 'gray' } : { color: '#333' }} />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '95%', marginTop: 10 }}>

                        <View style={[styles.smallContainer, { marginRight: 5, width: '45%' }]}>
                            <TouchableOpacity style={styles.smallContainer} onPress={() => {navigation.openDrawer}}>
                                {/* <View style={styles.row} > */}
                                <MaterialCommunityIcons name="playlist-check" size={25} style={{ color: 'black' }}></MaterialCommunityIcons>
                                <View>
                                    <Text style={styles.normalText}>Content</Text>
                                    <Text>250 chapters</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                        <View style={[styles.smallContainer, { marginLeft: 5 }]}>
                            <TouchableOpacity style={styles.smallContainer} onPress={() => { navigation.navigate('NovelDetail', { title: novel.title }); }}>
                                <Image source={{ uri: novel.imagesURL }} style={{ width: 50, height: 60 }} />
                                <View style={styles.textContainer}>
                                    <Text numberOfLines={2} style={[styles.normalText]}>About this book</Text>
                                </View>
                                <MaterialCommunityIcons name="chevron-right" size={20} style={{ color: '#333' }} />
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </View >
        </BottomSheet >
        {/* <DrawerNavigator/> */}
    </View >;
};


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        // width: '100%',
        // height: '100%',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
    },
    panel:
    {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#e8ede8',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    },
    smallContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        backgroundColor: '#EBEBEB', padding: 10, height: 80,
        alignItems: 'center',
        borderRadius: 10,
    },
    normalText: {
        fontSize: 15,
        color: '#333',

    }, row: {
        flexDirection: 'row'
    },
    textContainer: {
        width: '50%',
        marginLeft: 10,
    }
});
export default ChapterDetail;