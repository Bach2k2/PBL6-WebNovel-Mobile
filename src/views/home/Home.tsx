import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import useFetch from '../../hook/useFetch';
import { getNovelData } from '../../hook/NovelApi';
import { Novel } from '../../models/Novel';
import NovelRow from '../../components/Home/NovelRow';
import Header from '../../components/Header/Header'
import NovelGrid from '../../components/Home/NovelGrid'
function HotNovels() {
  const navigation = useNavigation();
  // const [novels, setNovels] = useState<Novel[]>([]);
  const [novels, setNovels] = useState(Array<Novel>());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await getNovelData().then((data) => { // thêm await sẽ tạo 
        setNovels(data);
        console.log('I fire one')
        // console.log('novels' + novels);
        setLoading(false); // Đã tải xong dữ liệu
      }).catch((err) => {
        // setNovels(novelsData)
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
      <ScrollView>
        <ScrollView onScroll={handleScroll}>
          {/* <RmdNovel></RmdNovel> */}
          <NovelGrid novelData={novels} />

        </ScrollView>
        <NovelRow />
        <ImageRow></ImageRow>

        <NovelsList navigation={navigation}></NovelsList>
      </ScrollView>
    </SafeAreaView>
  );
}

// const Header = () => {
//   return (
//     <View>
//       <View style={styles.header}>
//         <Image source={require('../../assets/img/TTQBA.png')} style={styles.logo}></Image>
//         <View style={styles.searchContainer}>
//           <Icon name="search" size={24} color="black" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Tác giả/ Tác phẩm"
//             placeholderTextColor="gray"
//           />
//         </View>
//         <TouchableOpacity style={styles.settingButton}>
//           <Icon name="settings" size={24} color="black"></Icon>
//         </TouchableOpacity>
//       </View>
//       <View style={{ marginLeft: 20 }}>
//         <Text>Novels</Text>
//       </View>
//     </View>
//   );
// }


// const RmdNovel = () => {
//   const data = [
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'A stack attributes' },
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 2' },
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 3' },
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 4' },
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 5' },
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 6' },
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 7' },
//     { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 8' },
//   ];

//   const renderRow = (row: number) => (
//     <View style={styles.row} key={row}>
//       {data.slice(row * 4, (row + 1) * 4).map((item, index) => (
//         <View style={styles.column} key={index}>
//           <Image source={{ uri: item.image }} style={styles.image} />
//           <Text style={styles.text}>{item.text}</Text>
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <>
//       <View style={{
//         backgroundColor: 'lightblue',
//         padding: 12,
//       }}>
//         <Text style={{ color: "black", fontSize: 24, }}>Weekly Feature</Text>
//       </View>
//       <View style={styles.rcm_container}>
//         {Array.from({ length: Math.ceil(data.length / 4) }, (_, i) => renderRow(i))}
//       </View>
//     </>
//   );
// }

function ImageRow() {
  // const images = [ /* Array of image sources */ ];
  const images = [
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'A stack attributes' },
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 2' },
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 3' },
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 4' },
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 5' },
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 6' },
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 7' },
    { image: 'https://picsum.photos/seed/picsum/200/300', text: 'Novel 8' },
  ];
  return (
    <>
      <View style={{
        backgroundColor: 'lightblue',
        padding: 12,
      }}>
        <Text style={{ color: "black", fontSize: 24, }}>From your Reading Preference</Text>
      </View>
      {/* <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
      ))}
    </ScrollView> */}
      <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
        {images.map((item, index) => (
          <View key={index}>
            <Image source={{ uri: item.image }} style={styles.prefer_image} />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.text_imgrow}>{item.text}</Text>
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
  useEffect(() => {
    const fetchData = async () => {
      await getNovelData().then((data) => {
        console.log('I fire two')
        setNovels(data);
      }).catch((err) => {
        console.error(err);
      })
    }
    fetchData();
  }, []);


  return (
    <ScrollView>
      <View style={{
        backgroundColor: 'lightblue',
        padding: 12,
      }}>
        <Text style={{ color: "black", fontSize: 24, }}>You may also like:</Text>
      </View>
      {novels.map((novel, index) => (
        <View key={index}>
          <TouchableOpacity style={styles.novelContainer} onPress={() => {
            console.log('Press to novel details' + novel.id);
            navigation.navigate('NovelDetail', { novelId: novel.id });
          }}>
            <Image source={{ uri: novel.imagesURL }} alt='https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447' style={styles.novelImage} />
            <View style={styles.novelContent}>
              <Text numberOfLines={1} style={styles.novelTag}>{novel.tags}</Text>
              <Text numberOfLines={1} style={styles.novelTitle}>{novel.title}</Text>
              <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
              <Text numberOfLines={1} style={styles.novelGenre}>{novel.genreName.join()} . <Icon name='description' size={16} color="gray" />{novel.views}</Text>
            </View>

            <Icon.Button name='add-box' size={24} color="black" backgroundColor="transparent" onPress={() => { console.log('add novel into lib') }} />
          </TouchableOpacity>

        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    width: 70,
    height: 100,
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
    height: 100,
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
