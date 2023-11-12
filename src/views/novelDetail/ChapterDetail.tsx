import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Pdf from 'react-native-pdf';
import { Chapter } from "../../models/Chapter";
import { getChaptersByChapterId } from "../../hook/ChapterApi";
const ChapterDetail = ({ route }: any) => {
    const [chapter, setChapter] = useState<Chapter>();
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfArray, setPdfArray] = useState<JSX.Element[]>([]);
    const { chapterId } = route.params;

    useEffect(() => {
        const fetchChapterById = async () => {
            try {
                const data = await getChaptersByChapterId(chapterId);
                console.log("chapter Response:", data);
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