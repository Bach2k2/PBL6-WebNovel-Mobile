// screens/CategoryDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Novel } from '../../models/Novel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getNovelByGenre } from '../../hook/NovelApi';
import { useNavigation } from '@react-navigation/native';

function NovelByGenre({ route }: { route: any }) {
  const { genre } = route.params;
  const [novelByGenre, setNovellByGenre] = useState<Array<Novel>>([]);
  const navigation = useNavigation();

  const novelData = [
    { title: 'Novel 1', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: 'Blood Sniper', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 1', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 2', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 3', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 4', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 5', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 6', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 7', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 8', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 9', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },
    { title: 'Novel 10', coverImageUrl: 'https://book-pic.webnovel.com/bookcover/22600918205369205?imageMogr2/thumbnail/150&imageId=1684504174447', author: '_Er', genre: ['Eastern', 'Fantasy'], content: 'Content of Novel 2', view: 135, tag: '#ACTION #ADVENTURE' },

  ]
  useEffect(() => {
    const fetchData = async () => {
      getNovelByGenre(genre.id).then((data) => {
        console.log(data);
        setNovellByGenre(data);
      }).catch((err) => {
        console.log(err);
      })
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Chọn lọc</Text>
        <Text>Hot nhất</Text>
      </View>
      <View style={styles.content}>
        <ScrollView>
          {
            novelByGenre.map((novel, index) => (
              <TouchableOpacity onPress={() => {
                console.log('Press to novel detail');
                navigation.navigate('NovelDetail', { novelId: novel.id });
              }}>
                <View style={styles.novelContainer} key={index}>
                  <Image source={{ uri: novel.imagesURL }} alt='image' style={styles.novelImage} />
                  <View style={styles.novelContent}>
                    <Text numberOfLines={1} style={styles.novelTitle}>{novel.name}</Text>
                    <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
                    <Text numberOfLines={1} style={styles.novelGenre}>{novel.genres} . <Icon name='description' size={16} color="gray" />{novel.views}</Text>
                  </View>
                  <Icon.Button name='add-box' size={24} color="black" backgroundColor="transparent" />
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 30,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },

  content: {

  },

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

export default NovelByGenre;
