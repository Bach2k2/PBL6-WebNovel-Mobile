import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import getGenreData from '../../hook/GenreApi';
import { Genre } from '../../models/Genre';
import { NavigationContainer, RouteProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NovelByGenre from './NovelByGenre';
// import { Navigation } from 'react-native-navigation';
import Header from '../../components/Header/Header';

type ParamList = {
  NovelStoreHome: undefined; // This represents the 'Home' screen with no additional params
  // Add screen names and their corresponding param types here
  GenreDetail: { genre: Genre };
  NoGenre: undefined;
};
const GenreStack = createNativeStackNavigator();


function NovelStore() {

  // const [genreDatas, setGenreData] = useState(Array<Genre>());
  const [genreDatas, setGenreData] = useState<Genre[]>([]);
  useEffect(() => {
    const fetchGenreData = async () => {
      getGenreData().then((data) => {
        setGenreData(data);
        console.log('here ' + genreDatas)
      }).catch((err) => {
        throw err;
      });
    }
    fetchGenreData();
  }, []);

  return (
    <GenreStack.Navigator initialRouteName='NovelStoreHome'>
      <GenreStack.Screen name="NovelStoreHome" component={NovelStoreHome} options={{
        headerShown: false,
        title: "Bin"
      }} />
      {genreDatas.length > 0 ?
        (genreDatas.map((item, index) => (
          <GenreStack.Screen
            name={`${item.name}`}  // KO được đặt tên screen trùng với nhau 
            component={NovelByGenre} // Sử dụng component thay vì hàm
            initialParams={{ genre: item }} // Truyền params qua initialParams
            key={index}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
                fontWeight: 'bold',
              }
            }}
          />
        ))) : <GenreStack.Screen name={'NoGenre'} component={NoGenreScreen} />}
    </GenreStack.Navigator>
  );
}
const NovelStoreHome = ({ navigation }: { navigation: any }) => {
  const [genreDatas, setGenreData] = useState(Array<Genre>());
  const [flatListHeight, setFlatListHeight] = useState(0);
  const genreImg = [
    require('../../assets/img/genres/1.jpg'),
    require('../../assets/img/genres/2.jpg'),
    require('../../assets/img/genres/3.jpg'),
    require('../../assets/img/genres/4.jpg'),
    require('../../assets/img/genres/5.jpg'),
    require('../../assets/img/genres/6.png'),
    require('../../assets/img/genres/7.png'),
    require('../../assets/img/genres/8.jpg'),
  ]
  // const navigation = useNavigation();
  useEffect(() => {
    const fetchGenreData = async () => {
      getGenreData().then((data) => {
        setGenreData(data);
      }).catch((err) => {
        throw err;
      });
    }
    fetchGenreData();
  }, []);
  const handleFlatListLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setFlatListHeight(height);
  };
  return (
    <SafeAreaView>
      <Header />
      <View style={styles.content_container}>
        {/* <View style={styles.leftMenu}>
          <FlatList nestedScrollEnabled={true} data={[
            { key: 'Genres' },
            // { key: 'Phổ biến' },
            // { key: 'Xếp hạng' }
          ]}
           renderItem={({ item }) => <Text style={styles.leftItem}>{item.key}</Text>} />
        </View> */}
        {/* Flat list  */}
        <View style={[styles.rightContent]}>

          <Text style={{ marginLeft: 10, marginTop: 10, padding: 10, fontSize: 18, fontWeight: 'bold', color: 'black' }}>More fantasy</Text>
          <FlatList nestedScrollEnabled={true} data={genreDatas} numColumns={2}
            // onLayout={handleFlatListLayout}
            renderItem={({ item, index }) =>
              <View style={styles.rightItems}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate(`${item.name}`, { genre: item });
                  console.log(item.name);
                }}>
                  <View style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', margin: 5,
                  }}>
                    <Image style={styles.imageGenre} source={genreImg[index]} ></Image>
                    <View style={{ maxWidth: '70%' }}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.rightItemText}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            } />

        </View>
      </View>

    </SafeAreaView>
  );
}
const NoGenreScreen = () => {
  return (
    <View />
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
//     </View>
//   );
// }

const styles = StyleSheet.create({
  header: {
    // position: 'sticky', 
    // height:'20%',
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
    marginLeft: 10,
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
  content_container: {
    width: '100%',
    height: '85%',// 
    marginTop: 5,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', // Căn giữa dọc
    alignItems: 'center', // Căn giữa ngang

  },
  leftMenu: {
    width: '20%',
    height: '100%',
    flexDirection: 'column',
  },
  rightContent: {
    flex: 1,
    flexDirection: 'column',
    width: '80%',
    // height: '60%',
   // height: 'auto',
    backgroundColor: 'white',
    borderRadius: 30,

    // justifyContent: 'space-between', 
    // alignItems:'center'

  }
  , chosenLeftItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
  , leftItem: {
    padding: 10,
    fontSize: 14,
    fontWeight:'700',
    color:'#333'
    // height: 44,
  },
  rightItems: {
    backgroundColor: '#f0f0f0', // Light gray background color
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 5, height: 5 }, // Shadow offset for iOS
    shadowOpacity: 0.4, // Shadow opacity for iOS
    elevation: 5, // Elevation for Android (shadow effect)
    borderRadius: 10,
    flex: 0.5,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    // maxWidth: 130

  },
  imageGenre: {
    marginLeft: 10,
    width: 40,
    height: 50
  },
  rightItemText: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    // height: 44,
  },
});

export default NovelStore;
