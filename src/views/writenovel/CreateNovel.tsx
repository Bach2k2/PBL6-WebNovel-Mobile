import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Genre } from '../../models/Genre';

import { useTheme } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import getGenreData from '../../hook/GenreApi';
import { createNovel } from '../../hook/NovelApi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorProps, RootStackParamList } from '../../models/NavigationModel';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

// type NovelDetailProps = AppNavigatorProps<'CreateNovel'>;

const CreateNovel = ({ route, navigation }: any) => {
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [genreSelect, setGenreSelect] = useState<Genre>();
  const [disableCreateBtn, setDisableCreateBtn] = useState(true);

  const [postNovel, setPostNovel] = useState({
    Name: '',
    Title: '',
    Description: '',
    AccountId: '',
    GenresId: 1,
    File: null,
  });

  const authState = useContext(AuthContext);
  const { getUserData } = useContext(AuthContext);
  // const navigation = useNavigation<AppNavigatorProps<'CreateNovel'>>();

  const { colors } = useTheme();

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
        setGenreList(data);
        // console.log('here ' + genreList)
      }).catch((err) => {
        throw err;
      });
    }
    fetchGenreData();
  }, []);

  useEffect(() => {

  });



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
  const onChangeAuthor = (text: any) => {
    setAuthor(text);
    // setPostNovel({ ...postNovel, Author: text });
  };

  const onChangeImage = (selectedImage: any) => {
    setImage(selectedImage.path);
    setPostNovel({ ...postNovel, File: selectedImage.path });
  };

  const onChangeGenreValue = (value: any) => {
    setGenreSelect(value);
    setPostNovel({ ...postNovel, GenresId: value });
    // setPostNovel({ ...postNovel, Author: text });
  };


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
    const user = getUserData();
    // console.log(user.id);
    if (user) {
      setPostNovel({ ...postNovel, AccountId: user?.id });
      console.log(postNovel.Name);
      console.log(postNovel.Title)
      console.log(postNovel.Description)
      console.log(postNovel.AccountId)
      console.log(postNovel.GenresId)
      console.log(postNovel.File)
      // const formData = new FormData();

      if (postNovel.Name && postNovel.Description && postNovel.AccountId && postNovel.GenresId && postNovel.File) {
        createNovel(postNovel, authState.getAccessToken())
          .then((data) => {
            console.log("check novel, it's okay");
            console.log(data);
            navigation.navigate('WriteDashboard');
          })
          .catch(error => {
            console.error(error);
            // Handle error
          });
      }
    }else{
      console.log("Can't find user");
    }

  };



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleBottomSheet()} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={require('../../assets/img/waiting_img.jpg')} style={styles.image} />
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text>Tên truyện</Text>
        <TextInput style={styles.inputField} placeholder='Nhập tên truyện' onChangeText={onChangeName} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Mô tả</Text>
        <TextInput style={styles.inputField} value={description} onChangeText={onChangeDescription} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Tác giả</Text>
        <TextInput style={styles.inputField} value={author} onChangeText={onChangeAuthor} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Thể loại</Text>
        <View style={styles.inputField}>
          <Picker
            selectedValue={genreSelect}
            onValueChange={onChangeGenreValue}
          >
            {/* <ScrollView style={styles.selectBox}> */}
            {genreList.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item.id} />
            ))}
            {/* </ScrollView> */}

          </Picker>
        </View>

      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreate} >
        <Text style={styles.buttonText}>Đăng truyện</Text>
      </TouchableOpacity>
      <ImagePickerBS isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
    </View>
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
});
