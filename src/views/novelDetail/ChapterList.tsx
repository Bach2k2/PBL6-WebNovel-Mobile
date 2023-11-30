import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import { Chapter } from "../../models/Chapter";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getChaptersByNovelId } from "../../hook/ChapterApi";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
const ChapterList = ({ navigation, route }: any) => {
    const [loading, setLoading] = useState(true);
    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const { novel } = route.params;
    // const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },2000)
    })
    useEffect(() => {
        const fetchChapter = async () => {
            const data = await getChaptersByNovelId(novel.id);
            setChapterList(data);
        }
        fetchChapter();
    }, [novel]);

    if(loading){
        return(
            <ActivityIndicator/>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {chapterList.map((chapter, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        navigation.navigate('ChapterDetail', { chapterId: chapter.id, novel: novel,title: chapter.name });
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
        backgroundColor:'#FFFFFF'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    chapIndex: {
        marginRight: 20,
        fontSize:15,
        color:'#333'
    },
    chapterName: {
        flex: 1,
        marginLeft: 20,
        fontSize:15,
        color:'#333',    
    },
    lockIcon: {
        alignSelf: 'flex-end',
    },

});

export default ChapterList;
