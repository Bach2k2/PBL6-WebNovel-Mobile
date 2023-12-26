import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Novel } from '../../../models/Novel'
import { getChapters } from '../../../hook/ChapterApi';
import { Chapter } from '../../../models/Chapter';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../../models/User';
import { AuthContext } from '../../../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const UserChaptersDetail = ({ novel }: { novel: Novel }) => {
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true)
  const { authState, getUserData } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>();
  const navigation = useNavigation();

  const handleClickChapter = (chapter: Chapter) => {
    console.log('handleClick');
    navigation.navigate('EditChapter', { novel: novel, chapter: chapter });
  }
  useEffect(() => {

    setUser(getUserData());

    const fecthChapterByNovelId = async () => {
      try {
        const data = await getChapters(user?.id, novel.id, authState.accessToken);
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
          <View style={styles.chapterContent} key={index}>
            <View>
            <TouchableOpacity onPress={() => { handleClickChapter(chapter) }}>
              <View style={styles.row} >
                <Text style={{ marginLeft: 10, fontSize: 16, }}>{index}</Text>
                <Text style={styles.chapterName}>{chapter.name}</Text>
              </View>
              <View style={styles.row}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={{ marginLeft: 10, fontSize: 16 }}>Normal</Text>
                  <Text style={{ marginLeft: 10, fontSize: 16 }}> words </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 16 }}>
                    {new Date(chapter.publishDate).toISOString().slice(0, 10)} {new Date(chapter.publishDate).getHours()}:{new Date(chapter.publishDate).getMinutes()}
                  </Text> 
                </View>
              </View>
            </TouchableOpacity>
            </View>
           <View>
            <MaterialCommunityIcons name='trash-bin'/>
           </View>
          </View>
        ))}
      </View>
    )
  }
  else {
    return (
      <View style={styles.empty_container}>
        <Text style={{ fontSize: 20, color: '#333' }}>No chapter added</Text>
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
  }, empty_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterContent: {
    paddingTop:10,
    backgroundColor: '#FFFFFF',
    width: '90%',
    margin: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginBottom:10
  }, chapterName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight:'bold'
  }
})