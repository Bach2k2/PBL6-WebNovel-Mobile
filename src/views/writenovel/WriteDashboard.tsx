import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
function WriteDashboard() {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };


  const handleNavigate = () => {
    if (authState.authenticated) {
        console.log("You are authenticated");
        navigation.navigate('CreateNovel');

    }else{
      toggleBottomSheet();
    }
  }

  if(authState)
  return (
    <>
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.title}>Bắt đầu viết</Text>
        <View style={styles.boxNovelContainer}>
          <TouchableOpacity onPress={handleNavigate}>
            <View style={styles.box}>
              <View style={styles.iconContainer}>
                <Icon name={'book'} size={30} />
              </View>
              <View >
                <Text style={styles.headerText}>Làm một cuốn sách mới</Text>
              </View>
              <View>
                <Text style={styles.bodyText}>Tôi đã sẵn sàng với thông tin sách của mình(tên sách, bìa, thể loại, tóm tắt, v.v)</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
        <View style={styles.boxChapterContainer}>
          <TouchableOpacity onPress={handleNavigate}>
            <View style={styles.box}>
              <View style={styles.iconContainer}>
                <Icon name={'newspaper-variant-outline'} size={30} />
              </View>
              <View >
                <Text style={styles.headerText}>Đi viết chương mới</Text>
              </View>
              <View>
                <Text style={styles.bodyText}>Thông tin sách có thể chỉnh sửa sau</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheet isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
      </View>
      {/* <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      /> */}
    </>

  );
}

export default WriteDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 21,
    color: 'black',
    textAlign: 'left',
    margin: 5,
    alignSelf: 'flex-start'
  },
  boxNovelContainer: {
    // flex: 1,
    // justifyContent: 'space-around',
    width: '95%',
    height: 150,
    backgroundColor: 'gray',
    borderRadius: 8,
    color: 'white',
    margin: 5,

  }, box: {
    marginLeft: 10,
    width: '80%'
  },

  iconContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    // flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,

  },

  headerText: {
    fontSize: 20,
    color: 'white',
  },
  bodyText: {
    fontSize: 14,
    color: 'white',
  },

  boxChapterContainer: {
    width: '95%',
    height: 150,
    backgroundColor: '#9e5fc2',
    borderRadius: 8,
    color: 'white',
    margin: 5,
  }



});

