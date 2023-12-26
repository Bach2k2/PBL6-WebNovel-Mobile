import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignInBottomSheet from '../../components/BottomSheet/SignInBottomSheet';
import { AuthContext } from '../../context/AuthContext';
import { Novel } from '../../models/Novel';
import { getNovelByAccount } from '../../hook/NovelApi';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import WriteDashboard from './WriteDashboard';
import { AxiosContext } from '../../context/AxiosContext';
function WriteStorage({ navigation }: any) {

  const [userNovel, setNovelByUser] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const { getUserData } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);
  // const navigation = useNavigation();
  const { publicAxios } = useContext(AxiosContext);
  const user = getUserData();
  useEffect(() => {
    if (user) {
      const fetchNovelByAccount = async () => {
        await getNovelByAccount(publicAxios, user.id).then((data) => {

          setNovelByUser(data);
          setLoading(false);
          console.log("userLength", userNovel.length)
        })
      }
      console.log("run fetch novel by account", user.id);
      fetchNovelByAccount();
    }
  }, [, user]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const fetchNovelByAccount = async () => {
          await getNovelByAccount(publicAxios, user.id).then((data) => {

            setNovelByUser(data);
            setLoading(false);
            console.log("userLength", userNovel.length)
          })
        }
        fetchNovelByAccount();
      }

      return () => {
        // Cleanup or clear any subscriptions if needed
      };
    }, [, user])
  );
  const handleCreateBtnPress = () => {
    navigation.navigate("CreateNovel");
  }

  if (!authState.authenticated || userNovel.length == 0) {
    return <WriteDashboard />
  }
  return (
    <>
      <View>
        <Text style={styles.title}>My list of novels</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {userNovel.map((novel, index) => (
            <TouchableOpacity style={styles.novelBorder} key={index} onPress={() => {
              console.log('Press to novel detail');
              navigation.navigate('UserNovelDetail', { novel: novel, title: novel.name });
            }}>
              <View style={styles.novelContainer}>
                <Image source={{ uri: novel.imagesURL }} alt='image' style={styles.novelImage} />
                <View style={styles.novelContent}>
                  {novel.numChapter === 0 ? (
                    <Text numberOfLines={1}>New - {novel.numChapter}</Text>
                  ) : (
                    novel.status ? (
                      <Text numberOfLines={1}>Serializing - {novel.numChapter}</Text>
                    ) : (
                      <Text numberOfLines={1}>Complete - {novel.numChapter}</Text>
                    )
                  )}
                  <Text numberOfLines={1} style={styles.novelTitle}>{novel.name}</Text>
                  <View>
                    <Text style={styles.smallBtn}>Write</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
          }

        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={() => handleCreateBtnPress()}>
          <Text>Create new novel</Text>
        </TouchableOpacity>
      </View>
    </>

  );
}

export default WriteStorage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 21,
    color: 'black',
    textAlign: 'left',
    margin: 5,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    margin: 10,
  },
  novelBorder: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
    width: '98%',
    borderRadius: 10,
    marginBottom: 5,

  },
  novelContainer: {
    flex: 1,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'black',
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    width: '95%',
  },
  novelContent: {
    marginLeft: 10,
    flexDirection: 'column',
    width: '70%',
  },
  novelImage: {
    width: 100,
    height: 120,
    borderRadius: 5,
  },
  novelTitle: {
    fontSize: 21,
    color: 'black',
  },
  novelAuthor: {
    fontSize: 14,
    color: 'black',
  },
  smallBtn: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 50,
    textAlign: 'center',
    borderRadius: 5,
    color: '#FFFFFF',
  },
  // Button section
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  buttonDownload: {

    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  createButton: {
    width: '60%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    textAlign: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },

});

