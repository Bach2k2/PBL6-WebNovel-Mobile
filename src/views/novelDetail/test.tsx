import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import Pdf from 'react-native-pdf';
import { Chapter } from "../../models/Chapter";
import { getChaptersByChapterId } from "../../hook/ChapterApi";
function ChapterDetail({ route }: any) {
    const [chapter, setChapter] = useState<Chapter>();
    const [numOfPage, setNumOfPage] = useState(1);
    const { chapterId } = route.params
    const source = { uri: 'https://webnovel2023.s3-ap-southeast-1.amazonaws.com/fA9Z_c11r0m7pU4C0cNYeg/lmM1mAm4uUebE7JhrL3dpw/text.pdf', cache: true };
    const [chapterUrl,setChapterUrl] = useState('');
    useEffect(() => {
        const fecthChapterById= async()=>{
            await getChaptersByChapterId(chapterId).then((data)=>{
                setChapter(data);
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            });
        }
        fecthChapterById();
    }
    )
    const renderOtherPages = () => {
        const pages = [];
        for (let i = 2; i <= numOfPage; i++) {
            pages.push(
                <Pdf
                    key={i}
                    source={{uri: chapterUrl}}
                    page={i}
                    style={styles.pdf}
                />
            );
        }
        return pages;
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal pagingEnabled>
                {/* First page */}
                <Pdf
                    source={source}
                    enablePaging={false}
                    page={1}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                        setNumOfPage(numberOfPages);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                />
                {/* Additional pages */}
                {renderOtherPages()}
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
});

//export default ChapterDetail;
