import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import getPreferenceData from '../../hook/PreferenceApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Preference } from '../../models/Preference';
import { Checkbox } from 'react-native-paper';

const PreferenceEdit = ({ navigation }: any) => {
  const { authState, getUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(true);
  const [preferenceData, setPreferenceData] = useState<Preference[]>([]);
  const user = getUserData();

  // State to manage the checked status of each novel
  const [checkedNovels, setCheckedNovels] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxPress = (novelId: string) => {
    setCheckedNovels((prevCheckedNovels) => ({
      ...prevCheckedNovels,
      [novelId]: !prevCheckedNovels[novelId],
    }));
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => <CustomEditHeader />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          if (authState.authenticated) {
            console.log("call api preference");
            const data = await getPreferenceData(user, authState.accessToken);
            setPreferenceData(data);
            console.log(data); // Log the updated preferenceData
          } else {
            console.log("get preferList from AsyncStorage");
            const storedData = await AsyncStorage.getItem('preferList');
            if (storedData) {
              const parsedData = JSON.parse(storedData);
              setPreferenceData(parsedData); // add this array to understand
              console.log(parsedData.length);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();

      return () => {
        // Cleanup or clear any subscriptions if needed
      };
    }, [authState.authenticated, user])
  );

  const CustomEditHeader = () => {
    return (
      <View
        style={styles.header}
      >
        <View style={styles.closeButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="window-close" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Chọn mục</Text>
      </View>

    );
  };
  const renderRow = (row: number) => {
    return (
      <View style={styles.row} key={row}>
        {preferenceData.slice(row * 3, (row + 1) * 3).map((item, index) => (
          <View
            key={index}
            style={styles.itemContainer}

          >
            <TouchableOpacity style={styles.checkbox} onPress={() => handleCheckboxPress(item.novelId)}><Checkbox
              status={checkedNovels[item.novelId] ? 'checked' : 'unchecked'}
            /></TouchableOpacity>

            <Image source={{ uri: item.imagesURL }} style={styles.image} />
            <Text numberOfLines={1} style={styles.text}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>{Array.from({ length: Math.ceil(preferenceData.length / 3) }, (_, i) => renderRow(i))}</View>
      </ScrollView>
    </View>
  )
}

export default PreferenceEdit

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    // position:'relative',
  },
  headerText: {
    flex: 0.6,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  closeButton: {
    flex: 0.4,
    marginLeft: 10, // Add some margin if needed
  },
  container: {
    width: '100%',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  itemContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    flexDirection: 'column',
    position: 'relative',
  },
  image: {
    width: 90,
    height: 120,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
  checkbox: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  }


})