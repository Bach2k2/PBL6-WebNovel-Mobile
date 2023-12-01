import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Novel } from '../../models/Novel'
import { getChaptersByNovelId } from '../../hook/ChapterApi';
import { Chapter } from '../../models/Chapter';
import { useNavigation } from '@react-navigation/native';

const UserChaptersDetail = ({ novel }: { novel: Novel }) => {
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const navigation = useNavigation();
  const handleClickChapter= (chapter:Chapter)=>{
    console.log('handleClick');
    navigation.navigate('EditChapter',{novel: novel,chapter: chapter});
  }
  useEffect(() => {
    const fecthChapterByNovelId = async () => {
      try {
        const data = await getChaptersByNovelId(novel.id);
        setChapterList(data);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    }
    fecthChapterByNovelId()
  }, [novel])
  if (chapterList.length > 0) {
    return (
      <View style={styles.container}>
        {chapterList.map((chapter, index) => (
          <View style={styles.row} key={index}>
            <TouchableOpacity onPress={()=>{handleClickChapter(chapter)}} style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{ marginLeft: 10, fontSize: 16, }}>{index}</Text>
              <Text style={styles.chapterName}>{chapter.name}</Text>
            </TouchableOpacity>

          </View>
        ))}
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <Text>No chapter addeed</Text>
      </View>
    )
  }

}

export default UserChaptersDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    justifyContent: 'flex-start',
    // alignItems:'center'
  }, row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '90%',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  }, chapterName: {
    margin: 10,
    fontSize: 16,
    color: '#333',
  }
})