import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Pdf from 'react-native-pdf';
import { Chapter } from "../../models/Chapter";
import { getChaptersByChapterId } from "../../hook/ChapterApi";
function ChapterDetail({ route }: any) {
    const [chapter, setChapter] = useState<Chapter>();
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const { chapterId } = route.params
    const [isLoading, setIsLoading] = useState(true);
    const source = { uri: 'https://webnovel2023.s3-ap-southeast-1.amazonaws.com/fA9Z_c11r0m7pU4C0cNYeg/lmM1mAm4uUebE7JhrL3dpw/text.pdf', cache: true };
    var url: string;
    // useEffect(() => {
    //     const fecthChapterById = async () => {
    //         try {
    //             const data = await getChaptersByChapterId(chapterId);
    //             console.log("chapter Response:", data);
    //             setChapter(data);
    //             console.log("chapter in useEffect:", chapter);
    //             if (chapter?.fileContent === undefined) {
    //                 url = source.uri;
    //                 console.log("file content is underfined", url);
    //                 setIsLoading(false);
    //             } else {
    //                 setIsLoading(false);
    //                 url = chapter.fileContent;
    //                 console.log(url);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fecthChapterById();
    // }, [])

    // useEffect(()=>{

    // })
    useEffect(() => {
        const fetchChapterById = async () => {
            try {
                const data = await getChaptersByChapterId(chapterId);
                console.log("chapter Response:", data);
                setChapter(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchChapterById();
    }, [chapterId]);

    useEffect(() => {
        if (chapter) {
            if (chapter.fileContent === undefined) {
                url = source.uri;
                console.log("file content is undefined", url);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                url = chapter.fileContent;
                console.log(url);
            }
        }
    }, [chapter]);

    const handlePageChange = (page: number, numberOfPages: number) => {
        console.log(`Current page: ${page}`);
        // setNumOfPages(numberOfPages);
        setCurrentPage(page);
    };

    const renderPages = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        const pages = [];
        for (let i = 1; i <= numOfPages; i++) {
            pages.push(
                <Pdf
                    trustAllCerts={false}
                    key={i}
                    source={{ uri: url, cache: true, }} // Use template literals to insert the dynamic URL
                    page={i}
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
        }
        return pages;
    };

    return (

        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const page = Math.ceil(offsetX / Dimensions.get('window').width) + 1;
                    setCurrentPage(page);
                }}
            >
                {renderPages()}
            </ScrollView>
        </View>
    );
}

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

