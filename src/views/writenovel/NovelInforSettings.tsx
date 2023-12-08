import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Novel } from '../../models/Novel'
import { ImagePickerBS } from '../../components/BottomSheet/ImagePickerBS'
import { AuthContext } from '../../context/AuthContext'
import { DeleteNovel, EditNovel } from '../../hook/NovelApi'
import Modal from 'react-native-modal'


const NovelInforSettings = ({ novel }: { novel: Novel }) => {

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [imageSelect, setImageSelect] = useState('');
  const [isNovelValid, setNovelValid] = useState(false);

  const [isBSNameVisible, setBSNameVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const toggleNameBS = () => {
    setBSNameVisible(!isBSNameVisible);
  };

  const handleSubmit = () => {
    // Xử lý hành động submit ở đây
    console.log('Submitted:', textInputValue);

    // Đóng Modal
    toggleNameBS();
  };

  //Image BS
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const { authState, getUserData } = useContext(AuthContext)
  const user = getUserData();

  const handleDeleteNovel = async () => {
    console.log('delete');
    const res = await DeleteNovel(novel, authState.accessToken);
    console.log(res);
  }

  const checkNovelIsValid = () => {
    if (novel.name == "" || novel.genreIds.length == 0 || novel.imagesURL == "") {
      return false;
    }
    return true
  }

  const handleEditNovel = async () => {
    if (checkNovelIsValid()) {
      const res = await EditNovel(novel, authState.accessToken);
      console.log(res);
    }
  }

  useLayoutEffect(() => {
    // setImageSelect()
    console.log(imageSelect)
  }, [imageSelect])

  const NameBS = () => {
    return (
      <Modal isVisible={isBSNameVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Enter text"
            onChangeText={(text) => setTextInputValue(text)}
            style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNameBS}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }


  // const {novel} = route.params;
  return (
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
          <TouchableOpacity onPress={() => { toggleNameBS() }}>
            <View style={styles.row}>

              <View style={styles.rowItem}>
                <Text style={{ color: 'red', marginRight: 5 }}>*</Text>
                <Text style={styles.headerText}>Title</Text>
              </View>
              <View style={styles.rowValue}>
                <Text>{novel.name}</Text>
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
          <TouchableOpacity onPress={() => { console.log('Hello') }}>
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
          <TouchableOpacity onPress={() => { console.log('Hello') }}>
            <View style={styles.row}>

              <View style={styles.rowItem}>
                <Text style={{ color: 'red', marginRight: 5 }}>*</Text>
                <Text style={styles.headerText}>Description</Text>
              </View>
              <View style={styles.rowValue}>
                {/* <Text>{novel.description}</Text> */}
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
        <NameBS />
      </View>
    </ScrollView>
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
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
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

  }
})