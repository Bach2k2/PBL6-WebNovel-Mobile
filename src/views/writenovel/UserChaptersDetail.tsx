import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Novel } from '../../models/Novel'
import { getChaptersByNovelId } from '../../hook/ChapterApi';
import { Chapter } from '../../models/Chapter';

const UserChaptersDetail = ({ novel }: { novel: Novel }) => {
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
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
            <Text>{chapter.name}</Text>
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

  },row:{
    
  }
})