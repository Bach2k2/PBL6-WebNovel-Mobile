import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Dimensions, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';


import useFetch from '../../hook/useFetch';
import { getNovelData } from '../../hook/NovelApi';
import { Novel } from '../../models/Novel';
import NovelRow from '../../components/Home/NovelRow';
import Header from '../../components/Header/Header'
import NovelGrid from '../../components/Home/NovelGrid'
import Skeleton from '../../components/Loading/Skeleton';
import { AuthContext } from '../../context/AuthContext';
import getPreferenceData, { postPreferenceData } from '../../hook/PreferenceApi';
import NovelGridSkeleton from '../../components/Loading/NovelGridSkeleton';
import NovelRowSkeleton from '../../components/Loading/NovelRowSkeleton';
import { Preference } from '../../models/Preference';
import AsyncStorage from '@react-native-async-storage/async-storage';


function HotNovels() {
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  // const [novels, setNovels] = useState<Novel[]>([]);
  const [novels, setNovels] = useState(Array<Novel>());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>()
  const { getUserData } = useContext(AuthContext)

  useEffect(() => {
    setUser(getUserData());
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      console.log("Call my api");
      if (user) {

      } else {
        await getNovelData().then((data) => { // thêm await sẽ tạo 
          setNovels(data);
          setLoading(false); // Đã tải xong dữ liệu
        }).catch((err) => {
          setLoading(true); // Lỗi xảy ra, cũng đánh dấu là đã tải xong
          // console.error("Có lỗi kết nối xảy ra, vui lòng kiểm tra đường truyền");
        })
      }
    }
    fetchData();
  }, [,user]);

  const [headerSticky, setHeaderSticky] = useState(false);

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 0) {
      setHeaderSticky(true);
    } else {
      setHeaderSticky(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#FFFFFF', height: 50 }}>
          <Skeleton width={70} height={20} style={{ marginLeft: 10 }} />
          <Skeleton width={70} height={20} style={{ marginLeft: 10 }} />
          <Skeleton width={70} height={20} style={{ marginLeft: 10 }} />
          <Skeleton width={70} height={20} style={{ marginLeft: 10 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <NovelGridSkeleton />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 50, backgroundColor: '#fff' }}>
          <NovelRowSkeleton />
          <Skeleton width={width * 0.95} height={100} style={{ borderRadius: 10, marginBottom: 10 }} />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }} >
      {
        novels ? (
          <><Header />
            <ScrollView>
              <ScrollView onScroll={handleScroll}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <NovelGrid novelData={novels} />
                </View>
              </ScrollView>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <NovelRow novelData={novels} />
              </View>
              <NovelsList navigation={navigation}></NovelsList>
            </ScrollView>
          </>
        ) :
          (
            <View>
              <ActivityIndicator></ActivityIndicator>
            </View>
          )
      }
    </SafeAreaView >
  );
}

function NovelsList({ navigation }: any) {

  const [loading, setLoading] = useState(true);
  const [novels, setNovels] = useState(Array<Novel>());
  const [error, setError] = useState(null);
  const { getUserData } = useContext(AuthContext);
  const authState = useContext(AuthContext);
  const user = getUserData();
  const [preferList, setPreferList] = useState<Preference[]>([]);

  const handleAddToLib = async (novel: Novel) => {
    console.log('add novel into lib', novel.id);

    if (user) {
      if (
        preferList &&
        preferList.some(item => item.novelId === novel.id && item.accountId === user.id)
      ) {
        novel.isExistLib = true;
        console.log("Mảng chứa phần tử có cả novelId và accountId đều bằng với giá trị cần kiểm tra");
      } else {
        novel.isExistLib = false;
        console.log("Mảng không chứa phần tử thỏa mãn điều kiện hoặc preferList không tồn tại");
      }
      await postPreferenceData(user.id, novel.id, authState.getAccessToken()).then((response) => {
        console.log(response)

      }).catch((err) => {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      })
    } else {
      const newPreferList = {
        novelId: novel.id,
        accountId: '',
        name: novel.name,
        title: novel.title,
        author: novel.author,
        year: novel.year,
        views: novel.views,
        rating: novel.rating,
        imagesURL: novel.imagesURL,
        genreName: novel.genreName,
        genreIds: novel.genreIds,
        description: novel.description,
        status: novel.status,
        approvalStatus: novel.approvalStatus,
        numChapter: novel.numChapter
      };
      if (
        preferList &&
        preferList.some(item => item.novelId === novel.id)
      ) {
        novel.isExistLib = true;
        console.log("Mảng chứa phần tử có cả novelId và accountId đều bằng với giá trị cần kiểm tra");
      } else {
        novel.isExistLib = false;
        console.log("Mảng không chứa phần tử thỏa mãn điều kiện hoặc preferList không tồn tại");
      }

      // Lưu danh sách mới vào AsyncStorage
      try {
        setPreferList([...preferList, newPreferList]);
        await AsyncStorage.setItem('preferList', JSON.stringify(preferList));
        // console.log('Danh sách đã lưu vào AsyncStorage:', newPreferList);
        // setPreferList([...preferList, newPreferList]);
      } catch (error) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        // console.error('Lỗi khi lưu danh sách vào AsyncStorage:', error);
      }
      // console.log('chua dang nhap');
    }
  }

  // useEffect(() => {
  //   const clearAsyncStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('AsyncStorage cleared successfully.');
  //     } catch (error) {
  //       console.error('Error clearing AsyncStorage:', error);
  //     }
  //   };

  //   // Gọi hàm để xóa tất cả dữ liệu
  //   clearAsyncStorage();
  // },[])

  useEffect(() => {
    const fetchNovelData = async () => {
      await getNovelData().then((data) => {
        setNovels(data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
      })
    }
    fetchNovelData();
  }, []);

  // get preference data
  useEffect(() => {
    if (user) {
      const fetchPreferenceData = async () => {
        await getPreferenceData(user, authState.getAccessToken()).then((data) => {
          setPreferList(data)
        }).catch((err) => { console.error('Something went wrong with preference list'); });
      }
      fetchPreferenceData();
    }
  }, [user]);
  // render 
  if (loading) {
    return (
      <Skeleton height={30} width={500} style={{ borderRadius: 5, marginBottom: 5 }} />
    );
  }
  return (
    <View style={styles.container}>
      <View style={{
        margin: 10,
      }}>
        <Text style={{ color: "black", fontSize: 24, }}>You may also like:</Text>
      </View>
      {novels.map((novel, index) => (
        <View key={index}>
          <TouchableOpacity style={styles.novelContainer} onPress={() => {
            navigation.navigate('NovelDetail', { novelId: novel.id, title: novel.name });
          }}>
            <Image source={{ uri: novel.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.novelImage} />
            <View style={styles.novelContent}>
              <Text numberOfLines={1} style={styles.novelTag}>{novel.tags}</Text>
              <Text numberOfLines={1} style={styles.novelTitle}>{novel.title}</Text>
              <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
              <Text numberOfLines={1} style={styles.novelGenre}>{novel.genreName.join()} . <Icon name='script-text-outline' size={16} color="gray" />{novel.views}</Text>
            </View>
            <TouchableOpacity onPress={() => {
              handleAddToLib(novel)
              novel.isExistLib = !novel.isExistLib;
            }}>
              {novel.isExistLib ?
                (<Icon name='check' size={24} color="black" />) :
                (<Icon name='plus-box' size={24} color="black" />)}

            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    width: '95%',
  },
  header: {
    // position: 'sticky', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    padding: 5
  },
  searchInput: {
    flex: 1,
    marginLeft: 5
  },
  settingButton: {
    width: '15%',
    alignItems: 'center',
  },

  // for the rmd -bookmark
  rcm_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
  // Reading Preferences
  imageRow: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  prefer_image: {
    margin: 5,
    width: 70,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    width: 50, // Match the image width
    marginLeft: 7
  },
  text_imgrow: {
    marginTop: 5,
    textAlign: 'left',
    fontSize: 14,
  },
  // all novels
  novelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  novelImage: {
    width: 100,
    height: 120,
    marginRight: 10,
  },
  novelContent: {
    flex: 1,
  },
  novelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  }, novelTag: {
    fontSize: 22,
    color: 'gray',
  },
  novelAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  novelGenre: {
    fontSize: 16,
    color: 'gray',
  },


  containerSkeleton: {

  },
});
export default HotNovels;
