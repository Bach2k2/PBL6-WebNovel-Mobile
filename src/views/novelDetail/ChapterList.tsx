import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import { Chapter } from "../../models/Chapter";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getChaptersByNovelId } from "../../hook/ChapterApi";
const ChapterList = ({ route }: any) => {
    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const { NovelId } = route.params;
    useEffect(() => {
        console.log(NovelId)
        const fetchChapter = async () => {
            const data = await getChaptersByNovelId(NovelId);
            console.log('haha ', data);
            setChapterList(data);

        }
        fetchChapter();
    }, [NovelId])
    //  const source = { uri: 'https://webnovel2023.s3-ap-southeast-1.amazonaws.com/be608a5c-3e80-4fc7-818b-8b6993348bde/3a01b7ae-0522-49a9-a2fb-a73e947a3add/text.pdf', cache: true };
    return (
        <View style={styles.container}>
            <ScrollView>
                {chapterList.map((chapter, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={styles.chapIndex}>{chapter.chapIndex}</Text>
                        <Text numberOfLines={1} style={styles.chapterName}>{chapter.name}</Text>
                        {chapter.isLocked && (
                            <Icon name="lock" size={20} style={styles.lockIcon} />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    chapIndex: {
        marginRight: 20,
    },
    chapterName: {
        flex: 1,
        marginLeft: 20,
    },
    lockIcon: {
        alignSelf: 'flex-end',
    },

});

export default ChapterList;
