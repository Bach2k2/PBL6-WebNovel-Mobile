import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { AuthContext } from '../../context/AuthContext';
import { Novel } from '../../models/Novel';
import { getNovelByAccount } from '../../hook/NovelApi';
import { useNavigation } from '@react-navigation/native';
import WriteDashboard from './WriteDashboard';
function WriteStorage() {

  const [userNovel, setNovelByUser] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const { getUserData } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    const user = getUserData();
    const fetchNovelByAccount = async () => {
      await getNovelByAccount(user.id).then((data) => {

        setNovelByUser(data);
        setLoading(false);
        console.log("userLength", userNovel)
      })
    }
    if (user) {
      fetchNovelByAccount();
    }
  }, []);
  const handleCreateBtnPress = () => {
    navigation.navigate("CreateNovel");
  }

  if (!authState.authenticated || userNovel.length == 0) {
    return <WriteDashboard />
  }
  return (
    <>
    <View>
      <Text style={{fontSize:22,}}>Danh sách truyện của tôi</Text>
    </View>
      <ScrollView>
        <View style={styles.container}>
          {userNovel.map((novel, index) => (
            <TouchableOpacity style={styles.container} key={index} onPress={() => {
              console.log('Press to novel detail');
              // navigation.navigate('NovelDetail', { novelId: novel.novelId });
            }}>
              <View style={styles.novelContainer}>
                <Image source={{ uri: novel.imagesURL }} alt='image' style={styles.novelImage} />
                <View style={styles.novelContent}>
                  {novel.status ? (<Text numberOfLines={1}>Còn tiếp - {novel.numChapter}</Text>) : (<Text numberOfLines={1}>Kết thúc - {novel.numChapter}</Text>)}
                  <Text numberOfLines={1} style={styles.novelTitle}>{novel.name}</Text>
                  <View>
                    <Text style={styles.smallBtn}>Viết</Text>
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
          <Text>Tạo truyện mới</Text>
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
    // alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 21,
    color: 'black',
    textAlign: 'left',
    margin: 5,
    alignSelf: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    margin: 10,
  },
  novelContainer: {
    flex:1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    width: '95%',
  },
  novelContent: {
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
    flex:1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    margin:5,
    width:50,
    textAlign:'center',
    borderRadius:5,
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

