import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import { Chapter } from "../../models/Chapter";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getChaptersByNovelId } from "../../hook/ChapterApi";
import { useNavigation } from "@react-navigation/native";
const ChapterList = ({ route }: any) => {
    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const { NovelId } = route.params;
    const navigation = useNavigation();
    useEffect(() => {
        console.log(NovelId)
        const fetchChapter = async () => {
            const data = await getChaptersByNovelId(NovelId);
            setChapterList(data);

        }
        fetchChapter();
    }, [NovelId]);
    
    return (
        <View style={styles.container}>
            <ScrollView>
                {chapterList.map((chapter, index) => (
                    <TouchableOpacity key={index} onPress={()=>{
                        navigation.navigate('ChapterDetail', {chapterId: chapter.id});
                    }}>
                        <View style={styles.row}>
                            <Text style={styles.chapIndex}>{chapter.chapIndex}</Text>
                            <Text numberOfLines={1} style={styles.chapterName}>{chapter.name}</Text>
                            {chapter.isLocked && (
                                <Icon name="lock" size={20} style={styles.lockIcon} />
                            )}
                        </View>
                    </TouchableOpacity>
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
