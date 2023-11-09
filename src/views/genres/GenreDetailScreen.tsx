// screens/CategoryDetailScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Novel } from '../../models/Novel';
import Icon from 'react-native-vector-icons/MaterialIcons';

function GenreDetailScreen({ route }: { route: any }) {
  const { genre } = route.params;
  const [novelByGenre, setNovellByGenre] = useState<Array<Novel>>([]);

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Chọn lọc</Text>
        <Text>Hot nhất</Text>
      </View>
      <ScrollView>
        {
          novelData.map((novel, index) => (
            <View style={styles.novelContainer} key={index}>
              <Image source={{ uri: novel.coverImageUrl }} alt='image' style={styles.novelImage} />
              <View style={styles.novelContent}>
                <Text numberOfLines={1} style={styles.novelTag}>{novel.tag}</Text>
                <Text numberOfLines={1} style={styles.novelTitle}>{novel.title}</Text>
                <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
                <Text numberOfLines={1} style={styles.novelGenre}>{novel.genre} . <Icon name='description' size={16} color="gray" />{novel.view}</Text>
              </View>
              <Icon.Button name='add-box' size={24} color="black" backgroundColor="transparent" />
            </View>
          ))
        }
      </ScrollView>
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
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },


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

export default GenreDetailScreen;
