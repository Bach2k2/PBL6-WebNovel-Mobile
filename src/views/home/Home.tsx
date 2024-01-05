import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Dimensions, ToastAndroid, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useLinkTo, useNavigation } from '@react-navigation/native';

import { getNovelData, getTopTrendingNovelApi } from '../../hook/NovelApi';
import { Novel } from '../../models/Novel';
import NovelRow from '../../components/Home/NovelRow';
import Header from '../../components/Header/Header'
import NovelGrid from '../../components/Home/NovelGrid'
import Skeleton from '../../components/Loading/Skeleton';
import { AuthContext } from '../../context/AuthContext';
import getPreferenceData, { deletePreferenceApi, getPreferenceByUANApi, postPreferenceData } from '../../hook/PreferenceApi';
import NovelGridSkeleton from '../../components/Loading/NovelGridSkeleton';
import NovelRowSkeleton from '../../components/Loading/NovelRowSkeleton';
import { Preference } from '../../models/Preference';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../models/User';
import { AxiosContext } from '../../context/AxiosContext';
import { RankingList } from '../../components/Home/Rank';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

function HotNovels() {
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  // const [novels, setNovels] = useState<Novel[]>([]);
  const [novels, setNovels] = useState(Array<Novel>());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>()
  const { getUserData } = useContext(AuthContext)
  const [checkedNovels, setCheckedNovels] = useState<{ [key: string]: boolean }>({});
  const { authAxios } = useContext(AxiosContext)



  useEffect(() => {
    setUser(getUserData());
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      console.log("Call my api");
      if (user) {

      } else {
        await getNovelData(authAxios).then((data) => { // thêm await sẽ tạo 
          setNovels(data);
          setLoading(false); // Đã tải xong dữ liệu
        }).catch((err) => {
          setLoading(true); // Lỗi xảy ra, cũng đánh dấu là đã tải xong
        })
      }
    }
    fetchData();
  }, [, user]);

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
          <>
            <Header />
            <ScrollView>
              <ScrollView onScroll={handleScroll}>
                <View style={styles.component}>
                  <NovelGrid novelData={novels} />
                </View>
              </ScrollView>
              <View style={styles.component}>
                <NovelRow novelData={novels} />
              </View>
              <RankingList navigation={navigation} />
              <NovelsList navigation={navigation} />
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
  const { authAxios } = useContext(AxiosContext)
  const [isExistInLib, setExistInLib] = useState<boolean[]>([])

  const handleAddToLib = async (novel: Novel, index: number) => {
    console.log('add novel into lib', novel.id);

    if (user) {
      if (
        preferList &&
        preferList.some(item => item.novelId === novel.id && item.accountId === user.id)
      ) {
        setExistInLib((prevIsExistInLib) => {
          const updatedArray = [...prevIsExistInLib];
          updatedArray[index] = true;
          return updatedArray;
        });
        await deletePreferenceApi(user.id, novel.id, authState.getAccessToken()).then((response) => {
          console.log(response)

        }).catch((err) => {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        })

      } else {
        setExistInLib((prevIsExistInLib) => {
          const updatedArray = [...prevIsExistInLib];
          updatedArray[index] = false;
          return updatedArray;
        });
        await postPreferenceData(user.id, novel.id, authState.getAccessToken()).then((response) => {
          console.log(response)

        }).catch((err) => {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        })
      }

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
        setExistInLib((prevIsExistInLib) => {
          const updatedArray = [...prevIsExistInLib];
          updatedArray[index] = true;
          return updatedArray;
        });
        novel.isExistLib = true;
        console.log("Mảng chứa phần tử có cả novelId và accountId đều bằng với giá trị cần kiểm tra");

      } else {
        setExistInLib((prevIsExistInLib) => {
          const updatedArray = [...prevIsExistInLib];
          updatedArray[index] = false;
          return updatedArray;
        });
        novel.isExistLib = false;
        console.log("Mảng không chứa phần tử thỏa mãn điều kiện hoặc preferList không tồn tại");
      }

      // Lưu danh sách mới vào AsyncStorage
      try {
        setPreferList([...preferList, newPreferList]);
        await AsyncStorage.setItem('preferList', JSON.stringify(preferList));
      } catch (error) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    }
    fetchNovelData()
  }


  const fetchNovelData = async () => {
    await getNovelData(authAxios).then((data) => {
      setNovels(data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {

    const checkIsExistInLib = async (novels: Novel[]) => {
      if (user) {
        console.log('Im come to here')
        novels.map(async (novel, index) => {
          const data = await getPreferenceByUANApi(user, novel.id, authState.getAccessToken());
          if (data) {
            console.log('novel', data)
            novel.isExistLib = true
            // set 
            setExistInLib((prevIsExistInLib) => {
              const updatedArray = [...prevIsExistInLib];
              updatedArray[index] = true;
              return updatedArray;
            });
          } else {
            setExistInLib((prevIsExistInLib) => {
              const updatedArray = [...prevIsExistInLib];
              updatedArray[index] = false;
              return updatedArray;
            });
            novel.isExistLib = false
          }
        })
      }
      else {
        console.log('Im not come to here')
        const data = await AsyncStorage.setItem('preferList', JSON.stringify(preferList));
        console.log('prefer data', data);
      }
    }
    fetchNovelData();
    checkIsExistInLib(novels)
  }, [user]);

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
        <Text style={styles.headerTitle}>You may also like:</Text>
      </View>
      {novels.slice(10, 15).map((novel, index) => (
        <View key={index}>
          <TouchableOpacity style={styles.novelContainer} onPress={() => {
            navigation.navigate('NovelDetail', { novelId: novel.id, title: novel.title });
          }}>
            <Image source={{ uri: novel.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.novelImage} />
            <View style={styles.novelContent}>
              <Text numberOfLines={1} style={[styles.novelTitle,{marginBottom:SPACING.space_2}]}>{novel.title}</Text>
              <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
              <Text numberOfLines={1} style={styles.novelGenre}>{novel.genreName.slice(0, 2).join(' ')} . <Icon name='script-text-outline' size={16} color="gray" />{novel.views}</Text>
            </View>
            <TouchableOpacity style={{ right: 0 }} onPress={() => {
              handleAddToLib(novel, index)
              novel.isExistLib = !novel.isExistLib;
            }}>
              {isExistInLib[index] ?
                (<Icon name='check' size={26} color="black" />) :
                (<Icon name='plus-box' size={26} color="black" />)}
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
    borderRadius: BORDERRADIUS.radius_8,
    width: '95%',
  },
  component: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
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
  headerTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex,
    textAlign: 'left',
    overflow: 'hidden',
    fontWeight: '700',
  },
  normalTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
    marginTop: SPACING.space_10,
    fontSize: FONTSIZE.size_14,
    textAlign: 'left',
    overflow: 'hidden',
  },
  subTitle: {
    marginTop: 5,
    fontSize: FONTSIZE.size_14,
  },
 
  // all novels
  novelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.space_10,
  },
  novelImage: {
    width: 100,
    height: 140,
    marginRight: SPACING.space_10,
  },
  novelContent: {
    flex: 1,
    overflow: 'hidden', // Ẩn phần vượt quá độ rộng
    alignContent:'center',
  },
  novelTitle: {
    fontFamily:FONTFAMILY.poppins_bold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_18,
    fontWeight:'bold',
    overflow: 'visible',
    flexWrap: 'wrap',
  },    
  novelAuthor: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
  novelGenre: {
    fontSize: FONTSIZE.size_14,
    color: 'gray',
  },
});
export default HotNovels;
