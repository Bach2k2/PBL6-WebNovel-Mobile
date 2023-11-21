import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';


import useFetch from '../../hook/useFetch';
import { getNovelData } from '../../hook/NovelApi';
import { Novel } from '../../models/Novel';
import NovelRow from '../../components/Home/NovelRow';
import Header from '../../components/Header/Header'
import NovelGrid from '../../components/Home/NovelGrid'
import Skeleton from '../../components/Loading/Skeleton';
import { AuthContext } from '../../context/AuthContext';
import { postPreferenceData } from '../../hook/PreferenceApi';
function HotNovels() {
  const navigation = useNavigation();
  // const [novels, setNovels] = useState<Novel[]>([]);
  const [novels, setNovels] = useState(Array<Novel>());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await getNovelData().then((data) => { // thêm await sẽ tạo 
        setNovels(data);
        setLoading(false); // Đã tải xong dữ liệu
      }).catch((err) => {
        setLoading(true); // Lỗi xảy ra, cũng đánh dấu là đã tải xong
        console.error(err);
      })
    }
    fetchData();
  }, []);

  // const { data: novels, isLoading, error } = useFetch("novel")

  const [headerSticky, setHeaderSticky] = useState(false);

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 0) {
      setHeaderSticky(true);
    } else {
      setHeaderSticky(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      {novels ? (
        <ScrollView>
          <ScrollView onScroll={handleScroll}>
            {/* <RmdNovel></RmdNovel> */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <NovelGrid novelData={novels} />
            </View>
          </ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <NovelRow novelData={novels} />
            {/* <ImageRow novelData={novels} /> */}
          </View>
          <NovelsList navigation={navigation}></NovelsList>
        </ScrollView>
      ) :
        (<ActivityIndicator></ActivityIndicator>)}
    </SafeAreaView>
  );
}


function ImageRow({ novelData }: { novelData: Novel[] }) {
  return (
    <>
      <View style={{
        backgroundColor: 'lightblue',
        padding: 12,
      }}>
        <Text style={{ color: "black", fontSize: 24, }}>From your Reading Preference</Text>
      </View>

      <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
        {novelData.map((item, index) => (
          <View key={index}>
            {item.imagesURL ? (<Image source={{ uri: item.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.prefer_image} />) :
              (<Image source={require('../../assets/img/waiting_img.jpg')} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.prefer_image} />)}
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.text_imgrow}>{item.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

function NovelsList({ navigation }: any) {

  const [loading, setLoading] = useState(true);
  const [novels, setNovels] = useState(Array<Novel>());
  const [error, setError] = useState(null);
  const { getUserData } = useContext(AuthContext);
  const authState = useContext(AuthContext);
  const user = getUserData();

  const handleAddToLib = async (novelId: any) => {
    console.log('add novel into lib',novelId)
    if (user) {
      await postPreferenceData(user.id, novelId, authState.getAccessToken()).then((response) => {
        console.log(response)

      }).catch((err) => {
        console.log(err)
      })
    } else {
      console.log('chua dang nhap');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getNovelData().then((data) => {
        console.log('I fire two')
        setNovels(data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
      })
    }
    fetchData();
  }, []);

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
            console.log('Press to novel details' + novel.id);
            navigation.navigate('NovelDetail', { novelId: novel.id, title: novel.name });
          }}>
            <Image source={{ uri: novel.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.novelImage} />
            <View style={styles.novelContent}>
              <Text numberOfLines={1} style={styles.novelTag}>{novel.tags}</Text>
              <Text numberOfLines={1} style={styles.novelTitle}>{novel.title}</Text>
              <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
              <Text numberOfLines={1} style={styles.novelGenre}>{novel.genreName.join()} . <Icon name='description' size={16} color="gray" />{novel.views}</Text>
            </View>

            <Icon.Button name='add-box' size={24} color="black" backgroundColor="transparent" onPress={()=> handleAddToLib(novel.id)} />
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

});
export default HotNovels;
