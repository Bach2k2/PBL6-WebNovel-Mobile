import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Novel } from '../../models/Novel'
import { ImagePickerBS } from '../../components/BottomSheet/ImagePickerBS'
import { AuthContext } from '../../context/AuthContext'
import { DeleteNovel, EditNovel } from '../../hook/NovelApi'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import TitleEditBottomSheet from '../../components/BottomSheet/EditNovel/TitleEditBottomSheet'


const NovelInforSettings = ({ novel }: { novel: Novel }) => {
  const navigation = useNavigation();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [imageSelect, setImageSelect] = useState('');
  const [novelTitle,setNovelTitle]= useState('');
  const [pos, setPos] = useState('');

  const [isEditBsVisible, setEditBsVisible] = useState(false);


  const toggleEditNovelBS = () => {
    setEditBsVisible(!isEditBsVisible);
  };

  //Image BS
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const { authState, getUserData } = useContext(AuthContext)
  const user = getUserData();

  const handleDeleteNovel = async () => {
    console.log('delete');
    Alert.alert('Delete novel', 'Are you sure to delete this one', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: async () => {
          const res = await DeleteNovel(novel, authState.accessToken);
          console.log(res);
          navigation.navigate('WriteDashboard');
        }
      },
    ]);

  }


  useLayoutEffect(() => {
    // setImageSelect()
    console.log(imageSelect)
  }, [novel, imageSelect])

  useEffect(() => {
    // Define an async function to use await
    const updateNovelImage = async () => {
      if (imageSelect) {
        try {
          console.log('change: ',imageSelect)
          novel.imagesURL = imageSelect;
          const res=await EditNovel(novel, authState.accessToken);
          console.log('res of edit',res);
        } catch (err) {
          console.error(err);
        }
      }
    };

    // Invoke the async function immediately
    updateNovelImage();
  }, [imageSelect]);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <View>
                <Text>Basic Information</Text>
              </View>
              <View style={styles.alignRightItem}>
                <Text style={{ color: 'blue', fontWeight: 'bold' }}>Fold</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.imageInforCol}>
                <Text style={styles.headerText}>Book Cover</Text>
                <Text>Image size restrictions: 800*600px, within 5M, format: .JPG, JPEG</Text>
                <TouchableOpacity style={styles.button}
                  onPress={() => {
                    toggleBottomSheet()
                    if (imageSelect != '') {
                      novel.imagesURL = imageSelect
                      console.log(imageSelect)
                    }
                  }}>
                  <Icon name="upload" size={20} color={'blue'} />
                  <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image source={{ uri: novel.imagesURL }} width={100} height={150} />
              </View>
            </View>
            {/* TITLE */}
            <TouchableOpacity onPress={() => {
              setPos('novelTitle')
              toggleEditNovelBS()
            }}>
              <View style={styles.row}>

                <View style={styles.rowItem}>
                  <Text style={{ color: 'red', marginRight: 5 }}>*</Text>
                  <Text style={styles.headerText}>Title</Text>
                </View>
                <View style={styles.rowValue}>
                  <Text numberOfLines={1} >{novel.name}</Text>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.paddingLine}>
            </View>
            {/* LANGUAGE */}
            <TouchableOpacity onPress={() => { console.log('Hello') }}>
              <View style={styles.row}>

                <View style={styles.rowItem}>
                  <Text style={{ color: 'red', marginRight: 5 }}>*</Text>
                  <Text style={styles.headerText}>Language</Text>
                </View>
                <View style={styles.rowValue}>
                  <Text>English</Text>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.paddingLine}>
            </View>

            {/* GENRES*/}
            <TouchableOpacity onPress={() => {
              console.log('Hello')
              setPos('genre')
              toggleEditNovelBS();
            }}>
              <View style={styles.row}>

                <View style={styles.rowItem}>
                  <Text style={{ color: 'red', marginRight: 5 }}>*</Text>
                  <Text style={styles.headerText}>Genre</Text>
                </View>
                <View style={styles.rowValue}>
                  <Text>{novel.genreName.join(' ')}</Text>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.paddingLine}>
            </View>
            {/* LANGUAGE */}
            <TouchableOpacity onPress={() => {
              setPos('description')
              toggleEditNovelBS();
            }}>
              <View style={styles.row}>

                <View style={styles.rowItem}>
                  <Text style={{ color: 'red', marginRight: 5 }}>*</Text>
                  <Text style={styles.headerText}>Description</Text>
                </View>
                <View style={styles.rowValue}>

                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.paddingLine}>
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text style={{ color: 'red', marginRight: 5 }}>*</Text>
                <Text style={styles.headerText}>Status</Text>
              </View>
              <View style={styles.rowValue}>
                {novel.status ? (<Text>Serializing</Text>) : (<Text>Complete</Text>)}
                {/* <Icon name="chevron-right" size={20} /> */}
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleDeleteNovel}>
            <Text style={styles.deleteButtonText}>Delete novel</Text>
          </TouchableOpacity>
          <ImagePickerBS isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} onImageSelect={setImageSelect} />

        </View>
      </ScrollView>
      <TitleEditBottomSheet pos={pos} isVisible={isEditBsVisible} onClose={toggleEditNovelBS} novel={novel} setNovelTitle={setNovelTitle} />
    </>

  )
}

export default NovelInforSettings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '95%',
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: 'row',
    margin: 10,
    // marginBottom: 10,
    // marginTop: 10,
    justifyContent: 'space-between',
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  rowItem: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
  },
  rowValue: {
    width: '40%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 10,
  },

  alignRightItem: {
    alignSelf: 'flex-end',
    right: 20,
  },
  //Information
  imageInforCol: {
    width: '60%',
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#333'
  },
  imageContainer: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    borderBlockColor: 'lightblue',
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'lightblue',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  buttonText: {
    paddingLeft: 5,
    color: 'blue',
  },
  paddingLine: {
    backgroundColor: 'gray',
    width: '90%',
    height: 2,
  },

  deleteButtonText: {
    color: 'red',
    fontSize: 18,

  },

  // Modal:
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    // padding: 22,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
  titleText: {
    fontSize: 20,
  },
  submitBtn: {
    borderRadius: 10, margin: 10,
    backgroundColor: '#00a2ed', padding: 10,
    alignItems: 'center'
  }

})