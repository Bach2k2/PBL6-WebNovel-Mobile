// screens/CategoryDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Novel } from '../../models/Novel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getNovelByGenre } from '../../hook/NovelApi';
import { useNavigation } from '@react-navigation/native';

function NovelByGenre({ navigation, route }: any) {
  const { genre } = route.params;
  const [novelByGenre, setNovellByGenre] = useState<Array<Novel>>([]);
  // const navigation = useNavigation();

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
      {/* <View style={styles.header}>
        <View>
          <Text>Chọn lọc</Text>
        </View>
        <View>
          <Text>Hot nhất</Text>
        </View>
      </View> */}
      <View style={styles.content}>
        <ScrollView>
          {
            novelByGenre.map((novel, index) => (
              <TouchableOpacity key={index} onPress={() => {
                console.log('Press to novel detail');
                navigation.navigate('NovelDetail', { novelId: novel.id });
              }}>
                <View style={styles.novelContainer} >
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
    justifyContent: 'space-between',
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
