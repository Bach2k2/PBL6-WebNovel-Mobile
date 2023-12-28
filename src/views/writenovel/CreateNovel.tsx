import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Genre } from '../../models/Genre';

import { useTheme } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import getGenreData from '../../hook/GenreApi';
import { createNovel } from '../../hook/NovelApi';
import { AuthContext } from '../../context/AuthContext';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import Toast from 'react-native-toast-message';
import Spinner from '../../components/Spinner/Spinner';

// type NovelDetailProps = AppNavigatorProps<'CreateNovel'>;
type genreType = {
  'key': string,
  'value': string
}
const CreateNovel = ({ route, navigation }: any) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [genreList, setGenreList] = useState<genreType[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectGenres, setSelectedGenres] = useState([]);
  const [isDisableBtn, setDisableCreateBtn] = useState(true);
  const [isCreateLoading, setIsCreateLoading] = useState(false)

  const handleConfirm = (pItems: any) => {
    console.log('pItems =>', pItems);
  }

  const [postNovel, setPostNovel] = useState({
    Name: '',
    Title: '',
    Description: '',
    AccountId: null,
    GenreIds: [1],
    File: null,
  });

  const authState = useContext(AuthContext);
  const { getUserData } = useContext(AuthContext);

  const { colors } = useTheme();
  const user = getUserData();

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {

    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: false,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      onChangeImage(image);
      // setPostNovel({ ...postNovel, File: image.path });
      toggleBottomSheet();
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      onChangeImage(image);
      // setPostNovel({ ...postNovel, File: image.path });
      toggleBottomSheet();
    });
  }

  const renderInner = (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  useEffect(() => {
    const fetchGenreData = async () => {
      getGenreData().then((data) => {
        var temp: { key: string; value: string }[] = data.map((d: Genre) => ({
          key: d.id,
          value: d.name,
        }));
        setGenreList(temp);
      }).catch((err) => {
        throw err;
      });
    }
    fetchGenreData();
  }, []);
  useEffect(() => {
    if (user) {
      setPostNovel({ ...postNovel, AccountId: user?.id });
    }
  }, []);

  useEffect(() => {
    if (postNovel.Name == '' || postNovel.Title == '' || postNovel.AccountId == null || postNovel.Description == '' || postNovel.File == null) {
      setDisableCreateBtn(true);
    }
    else {
      setDisableCreateBtn(false);
    }
  }, [postNovel]);


  const onChangeName = (text: any) => {
    // setPostNovel({ ...postNovel, Name: text });
    // setPostNovel({ ...postNovel, Title: postNovel.Name }); // No set that way
    setPostNovel((prevState) => ({
      ...prevState,
      Name: text,
      Title: text,
    }));
  };

  const onChangeDescription = (text: any) => {
    setDescription(text);
    setPostNovel({ ...postNovel, Description: text });
  };

  // const onChangeGenres = (genres: any) => {

  //   console.log(genres);
  //   setSelectedGenres(genres);
  //   setPostNovel({ ...postNovel, GenreIds: selectGenres });
  // };

  // const onChangeImage = (selectedImage: any) => {
  //   setImage(selectedImage.path);
  //   setPostNovel({ ...postNovel, File: selectedImage.path });
  // };

  const ImagePickerBS = ({ isVisible, onClose }: any) => {

    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        style={styles.bottomModal}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          {renderHeader}
          {renderInner}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const handleCreate = () => {
    if (user) {
      if (postNovel.Name && postNovel.Description && postNovel.AccountId && selectGenres.length > 0 && postNovel.File) {
        createNovel(postNovel, selectGenres, authState.getAccessToken())
          .then((data) => {
            setTimeout(() => {
              setIsCreateLoading(true)
            }, 2000)
            setIsCreateLoading(false)
            Toast.show({
              type: 'success',
              text1: 'Create your novel successfully 👋',
              text2: 'This is some something 👋'
            });
            navigation.navigate('WriteDashboard');
          })
          .catch(error => {
            console.error(error);
            // Handle error
          });
      }
      else {
        console.log("error");
      }
    } else {
      console.log("Can't find user");
    }
  };



  return (

    <SafeAreaView style={styles.container}>
      <Spinner visible={isCreateLoading}></Spinner>
      <ScrollView>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
          <TouchableOpacity onPress={() => toggleBottomSheet()} style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Image source={require('../../assets/img/waiting_img.jpg')} style={styles.image} />
            )}
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', top: 0 }}>Upload cover novel</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.headerTitle}>Book title</Text>
            <Text style={{ color: 'red', marginLeft: 5 }}>*</Text>
          </View>

          <TextInput style={styles.inputField} placeholder='Enter book title' onChangeText={onChangeName} />
        </View>
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.headerTitle}>Genres</Text>
            <Text style={{ color: 'red', marginLeft: 5 }}>*</Text>
          </View>
          <MultipleSelectList
            setSelected={(val: any) => setSelectedGenres(val)}
            data={genreList}
            //data={genreList.map((genre) => ({ label: genre.value, value: genre.key }))}
            save="key"
            // onSelect={() => {
            //   console.log()
            // }}
            label="Genres"
          />

        </View>
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.headerTitle}> Short Description</Text>
            <Text style={{ color: 'red', marginLeft: 5 }}>*</Text>
          </View>
          <TextInput
            style={[styles.inputField, { height: 100, textAlignVertical: 'top' }]}
            value={description}
            onChangeText={onChangeDescription}
            multiline={true}
            numberOfLines={4}
            placeholder='Tell us more about your novels...'
          />
        </View>
        <TouchableOpacity style={isDisableBtn ? styles.btnDisabled : styles.button} onPress={handleCreate} disabled={isDisableBtn}>
          <Text style={isDisableBtn ? styles.disabledText : styles.buttonText}>Publish</Text>
        </TouchableOpacity>
        <ImagePickerBS isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
      </ScrollView>

    </SafeAreaView>
  );

};




export default CreateNovel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor:'green',
    borderRadius: 5,

  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    // height:50,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
  },
  selectBox: {
    width: '80%',
    height: '80%',
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  button: {
    backgroundColor: '#FF6347',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
    fontSize: 18,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },

  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
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
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  btnDisabled: {
    backgroundColor: '#EBEBEB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledText: {
    color: 'gray',
    fontSize: 16,
  },
});
