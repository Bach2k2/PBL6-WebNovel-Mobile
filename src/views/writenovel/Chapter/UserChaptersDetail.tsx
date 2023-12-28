import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Novel } from '../../../models/Novel'
import { deleteChapterApi, editChapterApi, getChapters } from '../../../hook/ChapterApi';
import { Chapter } from '../../../models/Chapter';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { User } from '../../../models/User';
import { AuthContext } from '../../../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from '../../../components/Spinner/Spinner';
import Toast from 'react-native-toast-message';

const UserChaptersDetail = ({ novel }: { novel: Novel }) => {
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true)
  const { authState, getUserData } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>();
  const [isAbleLock, setIsAbleLock] = useState(false);

  const [isUnlockLoading, setIsUnlockLoading] = useState(false)

  const navigation = useNavigation();

  const handleClickChapter = (chapter: Chapter) => {
    console.log('handleClick');
    navigation.navigate('EditChapter', { novel: novel, chapter: chapter });
  }
  const handleDeleteChapter = (chapter: Chapter) => {
    if (user) {
      Alert.alert('Do you want to delete this chapter', `Name: ${chapter.name}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            const res = await deleteChapterApi(chapter.id, authState.accessToken)
            console.log(res)
          }
        },
      ]);
    }
  }
  const handleLockChapter = (chapter: Chapter) => {
    if (user) {
      if (isAbleLock && !chapter.isLocked) {
        Alert.alert('Do you want to lock this chapter', `Name: ${chapter.name}`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {
              const data = {
                Id: novel.id,
                Name: chapter.name,
                Discount: chapter.discount,
                FeeId: chapter.feeId,
                IsPublished: chapter.isPublished,
                View: novel.views,
                IsLocked: true,
                ApprovalStatus: chapter.approvalStatus,
                accessToken: authState.accessToken
              }
              const res = await editChapterApi(data)
              console.log(res)
            }
          },
        ]);
      } else {
        Alert.alert("Your views dont't have enough to lock this chapter, at least 1500 views")
      }

    }
  }

  const handleUnlockChapter = (chapter: Chapter) => {
    if (user) {
      if (chapter.isLocked) {
        Alert.alert('Do you want to unlock this chapter', `Name: ${chapter.name}`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {
              const data = {
                Id: novel.id,
                Name: chapter.name,
                Discount: chapter.discount||0,
                FeeId: chapter.feeId,
                IsPublished: chapter.isPublished,
                Views: novel.views,
                IsLocked: true,
                ApprovalStatus: chapter.approvalStatus,
                File: chapter.fileContent,
                accessToken: authState.accessToken
              }
              setIsUnlockLoading(true);
              const res = await editChapterApi(data)
              console.log(res)
              
              setTimeout(()=>{
                setIsUnlockLoading(false);
              },3000)
              Toast.show({
                type: 'success',
                text1: 'Unlock successfully',
              });
            }
          },
        ]);
      } else {
        Alert.alert("Your novel dont't have enough to lock this chapter, at least 1500 views")
      }

    }
  }


  useEffect(() => {
    if (novel.views >= 1500) {
      setIsAbleLock(true)
    } else {
      setIsAbleLock(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
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
      return () => {
        // Cleanup or clear any subscriptions if needed
      };
    }, [,novel])
  );
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
      <ScrollView>
        <Spinner visible={isUnlockLoading}/>
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
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

                {
                  chapter.isLocked ?
                    (
                      <TouchableOpacity onPress={() => {
                        handleUnlockChapter(chapter)
                      }}>
                        <MaterialCommunityIcons style={[{ margin: 10, }, isAbleLock ? { color: 'black' } : { color: 'gray' }]} name='lock-outline' size={20} />
                      </TouchableOpacity>
                    ) :
                    (
                      <TouchableOpacity onPress={() => {
                        handleLockChapter(chapter)
                      }}>
                        <MaterialCommunityIcons style={[{ margin: 10, }, isAbleLock ? { color: 'black' } : { color: 'gray' }]} name='lock-open-variant-outline' size={20} />
                      </TouchableOpacity>
                    )
                }
                <TouchableOpacity onPress={() => {
                  handleDeleteChapter(chapter)
                }}>
                  <MaterialCommunityIcons style={{ margin: 10 }} name='trash-can-outline' size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    // alignItems:'center'
  }, empty_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterContent: {
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    width: '90%',
    margin: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginBottom: 10
  }, chapterName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  }
})