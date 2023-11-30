import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, ToastAndroid } from "react-native";
import Pdf from 'react-native-pdf';
import { Chapter } from "../../models/Chapter";
import { getChapterByChapterId } from "../../hook/ChapterApi";
import getBookmarkedData, { postBookmarkData, putBookmarkData } from "../../hook/BookmarkedApi";
import { AuthContext } from "../../context/AuthContext";
import { Bookmarked } from "../../models/Bookmarked";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
const ChapterDetail = ({ route }: any) => {
    const [chapter, setChapter] = useState<Chapter>();
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfArray, setPdfArray] = useState<JSX.Element[]>([]);
    const { novel, chapterId } = route.params;
    const { authState, getUserData } = useContext(AuthContext);
    const user = getUserData();
    const [bookmarkList, setBookmarkList] = useState<Bookmarked[]>([]);
    const [loadingBookmark, setLoadingBookmark] = useState(true);

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

    // useEffect(() => {
    //     console.log('Updated bookmarkData in useEffect:', bookmarkList);
    // }, [bookmarkList]);

    // Call fetchData

    // useEffect(() => {
    //     fetchData();
    //     console.log('Fetching data mount')
    // }, []);

    useEffect(() => {
        const fetchChapterById = async () => {
            try {
                const data = await getChapterByChapterId(chapterId);
                // console.log("chapter Response:", data);
                setChapter(data);

                if (data.fileContent === undefined) {
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setNumOfPages(1); // Assuming the file has only one page initially
                    setPdfArray([renderPdf(1, data.fileContent)]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchChapterById();
    }, [chapterId]);


    // Add bookmarked of chapter:
    useEffect(() => {
        const addToBookmark = async () => {
            if (authState.authenticated) {
                // fetchData();\
                const bmList = await getBookmarkedData(user, authState.accessToken);
                if (
                    bmList &&
                    bmList.some((item:any) => item.novelId == novel.id && item.accountId == user.id)
                ) {
                    if (bmList.some((item:any) => item.chapterId != chapterId)) {
                        console.log('Call put')
                        const res = await putBookmarkData(user.id, novel.id, chapterId, authState.accessToken);
                        console.log(res);
                    }
                } else {
                    console.log('bm',bmList)
                    if (bmList.length > 0) {
                        const res = await postBookmarkData(user.id, novel.id, chapterId, authState.accessToken);
                        console.log(res);
                    }
                }
            } else {
                const newBookmark = {
                    novelId: novel.id,
                    chapterId: chapterId,
                    chapterIndex:0,
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

                    console.log("Mảng không chứa phần tử thỏa mãn điều kiện hoặc preferList không tồn tại");
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
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <ScrollView
                horizontal
                pagingEnabled
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const page = Math.ceil(offsetX / Dimensions.get('window').width) + 1;
                    setCurrentPage(page);
                }}
            >
                {pdfArray}
            </ScrollView>
        );
    };

    return <View style={styles.container}>{renderPages()}</View>;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default ChapterDetail;