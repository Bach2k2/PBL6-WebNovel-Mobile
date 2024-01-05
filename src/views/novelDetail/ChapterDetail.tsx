import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, ToastAndroid, Text, StatusBar, Pressable, Image, Alert } from "react-native";
import Pdf from 'react-native-pdf';
import { Chapter } from "../../models/Chapter";
import { getChapters, getChapterByChapterId, unlockChapterApi } from "../../hook/ChapterApi";
import getBookmarkedData, { postBookmarkData, putBookmarkData } from "../../hook/BookmarkedApi";
import { AuthContext } from "../../context/AuthContext";
import { Bookmarked } from "../../models/Bookmarked";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
// import BottomSheet from "../../components/BottomSheet/CustomBottomSheet";
import BottomSheet, { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ChapterListDrawer } from "./ChapterListDrawer";
import { DrawerItem, createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { BlurView } from '@react-native-community/blur';
import { User } from "../../models/User";
import SignInBottomSheet from "../../components/BottomSheet/SignInBottomSheet";
import GetAccountApi from "../../hook/AccountApi";
import { AxiosContext } from "../../context/AxiosContext";


const ChapterDetail = ({ navigation, route }: any) => {
    const { authState, getUserData, setUserData } = useContext(AuthContext);
    const { authAxios } = useContext(AxiosContext)
    const [user, setUser] = useState<User | null>();

    const [chapter, setChapter] = useState<Chapter>();
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfArray, setPdfArray] = useState<JSX.Element[]>([]);
    const { novel, chapterId } = route.params;


    const [bookmarkList, setBookmarkList] = useState<Bookmarked[]>([]);
    const [loadingBookmark, setLoadingBookmark] = useState(true);

    const [isFirstChapter, setIsFirstChapter] = useState(false);
    const [isLastChapter, setIsLastChapter] = useState(false);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showLockBottomSheet, setShowLockBottomSheet] = useState(false);
    const [showSignInBS, setShowSignInBS] = useState(false);




    const toggleSidebar = () => {
        console.log("Toggle sidebar")
        setShowSidebar(!showSidebar);
    };
    const navigateToChapter = (chapter: Chapter) => {
        navigation.replace('ChapterDetail', { chapterId: chapter.id, novel: novel });
        // Close the sidebar after navigating
        setShowSidebar(false);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const toggleSignInBS = () => {
        setShowSignInBS(!showSignInBS);
    }


    const snapPoints = useMemo(() => ['5%', '25%', '50%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        const userData = getUserData()
        setUser(userData);
    }, [user, getUserData])


    //------------------- Get chapter list -------------------------------- 
    const fetchChapters = async () => {
        try {
            console.log('uuu', user)
            const data = await getChapters(user, novel.id, authState.accessToken);
            setChapters(data);
            const selectedChapter = data.find((ch) => ch.id === chapterId);
            setChapter(selectedChapter)
            if (selectedChapter) {
                navigation.setOptions({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#EBEBEB',
                    },
                    headerLeft: () => (
                        <TouchableOpacity style={{ alignItems: 'center', marginRight: 10, flexDirection: 'row' }} onPress={() => { navigation.navigate('NovelDetail', { novelId: novel.id, title: novel.title }); }}>
                            <MaterialCommunityIcons name="chevron-left-circle" color='gray' size={20} style={{ marginRight: 5 }} />
                            <Text style={{ color: 'black', fontSize: 16, }}>{selectedChapter?.name}</Text>
                        </TouchableOpacity>
                    ),
                });
            }
            if (selectedChapter) {
                setIsLoading(false);
                setNumOfPages(1); // Assuming the file has only one page initiallys
                console.log(selectedChapter.fileContent)
                setPdfArray([renderPdf(1, selectedChapter.fileContent)]);
            }
            // Check novel display first chapter{
            // Check if it's the first or last chapter
            setIsFirstChapter(selectedChapter?.chapIndex === 1);
            setIsLastChapter(selectedChapter?.chapIndex === novel.numChapter);
        } catch (error) {
            console.log(error);
        }
    }
    //------------------- Get this chapter -------------------------------- 
    useEffect(() => {
        fetchChapters();
    }, [user, getUserData]);


    // Add bookmarked of chapter:
    useEffect(() => {
        const addToBookmark = async () => {
            if (user) {
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
    }, [novel]);

    const handlePageChange = (page: number, numberOfPages: number) => {
        console.log(`Current page: ${page}`);
        setCurrentPage(page);
    };

    const renderPdf = (page: number, uri: string) => {
        return (
            <Pdf
                trustAllCerts={false}
                key={page}
                source={{ uri: uri, cache: false }}
                fitPolicy={3}
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
        const scrollViewRef = useRef(null);
        console.log('locked', chapter?.isLocked)
        return (
            <ScrollView
                ref={scrollViewRef}
                scrollEnabled={false}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const page = Math.ceil(offsetX / Dimensions.get('window').width) + 1000;
                    setCurrentPage(page);
                }}
                onScroll={() => {
                    if (chapter?.isLocked && scrollViewRef.current) {
                        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
                    }
                }}
            >
                {pdfArray}
            </ScrollView>
        );
    };

    const changePreviousChapter = () => {
        try {
            if (chapter) {
                const previousChapter = chapters.find(c => c.chapIndex === chapter?.chapIndex - 1);
                if (previousChapter) {
                    navigation.replace('ChapterDetail', { chapterId: previousChapter.id, novel: novel });
                } else {
                    console.log('Previous chapter not found');
                }
            }

        } catch (e) {
            console.error('Error navigating to previous chapter', e);
        }
    }

    const changeNextChapter = () => {
        try {
            if (chapter) {
                const nextChapter = chapters.find(c => c.chapIndex === chapter?.chapIndex + 1);
                if (nextChapter) {
                    navigation.replace('ChapterDetail', { chapterId: nextChapter.id, novel: novel });
                } else {
                    console.log('Next chapter not found');
                }
            }
        } catch (e) {
            console.error('Error navigating to next chapter', e);
        }
    }
    const handleUnlockChapter = async () => {
        // Implement logic to handle unlocking the chapter, deducting coins, etc.
        // For example, you can show an alert for simplicity:
        Alert.alert('Unlock chapter', 'Are you sure to unlock this chapter', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    if (chapter) {
                        const data = {
                            chapterId: chapter.id,
                            accountId: user?.id,
                            accessToken: authState.accessToken
                        }
                        await unlockChapterApi(data);
                        Alert.alert(`Unlocking chapter ${chapter?.name}`);
                    }
                    else {
                        Alert.alert('Something went wrong, please try again')
                    }

                }
            },
        ]);
        setShowLockBottomSheet(false); // Close the bottom sheet after unlocking
        const newUserData = await GetAccountApi(authAxios, getUserData().id, authState.accessToken);
        setUserData(newUserData);
        console.log(chapter);
    };

    const renderBlurView = () => {
        if (user) {
            if (chapter?.isLocked) {
                return (
                    <View style={styles.blurViewContainer}>
                        <View style={styles.blurContainer}>
                            <View style={{ flexDirection: 'column', width: '70%' }}>
                                <Text style={{ color: '#333', fontSize: 21 }}>Locked Chapter</Text>
                                <Text numberOfLines={2} style={{ color: '#333', fontSize: 17 }}>Unlock chapters to read and support the author of this book</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Image source={require('../../assets/icons/book_lock_icon.png')} style={{ width: 80, height: 80 }} />
                            </View>

                        </View>
                        <View
                            style={styles.nestContainer}
                        >
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <View style={styles.panel}>
                                    {/* Display unlock cost, user balance, and option to get more coins */}
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={styles.normalText}>Unlock Cost</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.normalText}>- {chapter.fee} </Text>
                                            <Image source={require('../../assets/icons/coin_icon.png')} style={{ width: 30, height: 30 }} />
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={styles.normalText}>Your Balance</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.normalText}>{user?.walletAmmount} </Text>
                                            <Image source={require('../../assets/icons/coin_icon.png')} style={{ width: 30, height: 30 }} />
                                        </View>

                                    </View>


                                </View>
                                <View style={{ width: '95%' }}>
                                    <TouchableOpacity
                                        style={styles.btnUnlock}
                                        onPress={handleUnlockChapter}
                                    >
                                        <Text style={styles.btnTextType1}>Unlock Chapter</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.btnTopUp}
                                        onPress={() => navigation.navigate('CoinExchange')}
                                    >
                                        <Text style={styles.btnTextType2}>Get more coins</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>

                );
            } else {
                return null;
            }
        } else {
            if (chapter?.isLocked) {
                return (
                    <View
                        style={styles.blurContainer}
                    >
                        <View style={styles.blurContent}>
                            <Text style={{ color: '#333', fontSize: 22 }}>Please sign up/ sign in to continue</Text>
                            <TouchableOpacity
                                style={{ backgroundColor: 'lightblue', width: '95%', padding: 10, margin: 5 }}
                                onPress={toggleSignInBS}
                            >
                                <Text style={{ color: 'white' }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return null;
            }
        }
    };
    return (
        <View style={styles.container}>
            {renderPages()}
            {showSidebar && (
                // <TouchableWithoutFeedback onPress={closeSidebar}>

                <ScrollView style={styles.sidebar}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
                            <MaterialCommunityIcons
                                name={"chevron-left"}
                                size={30}
                                style={{ color: '#333' }}
                            />
                        </TouchableOpacity>
                        <Text>Content</Text>
                    </View>

                    {chapters.map((chapter) => (
                        <TouchableOpacity
                            key={chapter.id}
                            style={styles.chapterItem}
                            onPress={() => navigateToChapter(chapter)}
                        >
                            <Text style={styles.chapterTitle}>{chapter.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                // </TouchableWithoutFeedback>
            )}
            {renderBlurView()}

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                style={{ zIndex: 100 }}
            // backdropPress={closeSidebar}
            >

                <View style={styles.contentContainer}>
                    <View style={styles.blurContent}>
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
                                <TouchableOpacity style={styles.smallContainer} onPress={() => { toggleSidebar() }}>
                                    {/* <View style={styles.row} > */}
                                    <MaterialCommunityIcons name="playlist-check" size={25} style={{ color: 'black' }}></MaterialCommunityIcons>
                                    <View>
                                        <Text style={styles.normalText}>Content</Text>
                                        <Text>{chapters.length} chapters</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View style={[styles.smallContainer, { marginLeft: 5 }]}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => { navigation.navigate('NovelDetail', { novelId: novel.id, title: novel.title }); }}>
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
            <SignInBottomSheet isVisible={showSignInBS} onClose={toggleSignInBS} />
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    sidebar: {
        flex: 1,
        height: '100%',
        position: 'absolute',
        width: '65%',
        backgroundColor: '#F0F0F0', // Adjust background color as needed
        padding: 10,
        zIndex: 1,
    },
    pdf: {
        position: 'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 0
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
    },
    drawerStyle: {
        width: '60%', // Adjust the width as needed
    },
    chapterItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    chapterTitle: {
        fontSize: 16,
        color: '#333333',
    }, toggleButton: {
        // position: 'absolute',
        // top: 10,
        // left: 10,
        // padding: 10,
        // zIndex: 2,
    },

    // blur view:

    blurContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#AEAEAE',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%', // Adjust the height as needed
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#eae9ee',
        offset: 10
        // blurRadius: 10,
        // alignSelf: 'center',

    },
    blurViewContainer: {
        backgroundColor: 'transparent',
        bottom: 0,
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    blurView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        // height: 'auto'
    },
    blurContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnUnlock: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'lime',
        width: '95%',
        padding: 10, margin: 5,
        alignItems: 'center'
    },
    btnTopUp: {
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: 'pink',
        width: '95%',
        padding: 10, margin: 5
    },
    btnTextType1: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 15,
        fontWeight: 'bold',
    },
    btnTextType2: {
        textAlign: 'center',
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
    },
    nestContainer: {
        flex: 1,
        borderRadius: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#AEAEAE',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%', // Adjust the height as needed
        zIndex: 3,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#FFFFFF',
        // alignItems: 'center',

    },
    nestView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        // height: 'auto'
    },
    nestContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

});
export default ChapterDetail;