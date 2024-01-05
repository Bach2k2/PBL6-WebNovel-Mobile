import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import SignInBottomSheet from '../../components/BottomSheet/SignInBottomSheet';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

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

    } else {
      toggleBottomSheet();
    }
  }

  if (authState)
    return (
      <>
        <View style={styles.container}>
          <Text numberOfLines={1} style={styles.title}>Become a writer</Text>
          <Text style={styles.subTitle}>Start writing</Text>
          <View style={styles.boxNovelContainer}>
            <TouchableOpacity onPress={handleNavigate}>
              <View style={styles.box}>
                <View style={styles.iconContainer}>
                  <Icon name={'book'} size={30} />
                </View>
                <View >
                  <Text style={styles.headerText}>Make a new book</Text>
                </View>
                <View>
                  <Text style={styles.bodyText}>I'm ready with my book information(title, cover, genre,description,etc.)</Text>
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
                  <Text style={styles.headerText}>Go write chapters first </Text>
                </View>
                <View>
                  <Text style={styles.bodyText}>Book information can be edited later</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <SignInBottomSheet isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
        </View>
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
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontSize: 21,
    color: 'black',
    textAlign: 'left',
    marginLeft: SPACING.space_10,
    margin:5,
    alignSelf: 'flex-start'
  },
  subTitle:{
    fontFamily: FONTFAMILY.poppins_medium,
    alignSelf: 'flex-start',
    marginLeft:10,
  },
  boxNovelContainer: {
    width: '95%',
    height: 'auto',
    backgroundColor: 'gray',
    borderRadius: BORDERRADIUS.radius_8,
    color: 'white',
    margin: SPACING.space_10,
    paddingBottom: SPACING.space_10,
  }, 
  box: {
    marginLeft: 10,
    width: '80%',
    height:'auto',
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
  boxChapterContainer: {
    width: '95%',
    height: 'auto',
    backgroundColor: '#9e5fc2',
    borderRadius: BORDERRADIUS.radius_8, 
    margin: SPACING.space_10,
    paddingBottom: SPACING.space_10,
  },

  headerText: {
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize: 20,
    color: COLORS.primaryWhiteHex,
  },
  bodyText: {
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },

 
});

