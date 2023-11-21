import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { User } from '../../models/User';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from 'react-native-image-crop-picker';
import { TextInput } from 'react-native-paper';
const EditProfile = () => {

    const [user, setUserData] = useState<User | null>(null);
    const { getUserData } = useContext(AuthContext);
    const [avatarImg, setAvatarImg] = useState('https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3')

    const [updateUser, setUpdateUser] = useState({
        id: null,
        nickName: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        isAdmin: false,
        roleIds: [
            "READER"
        ],
        phone: "",
        walletAmmount: 0,
        isActive: true
    })

    useEffect(() => {
        setUserData(getUserData());
        setUpdateUser({
            ...updateUser,
            nickName: user?.username || '',
            username: user?.username || '',
            email: user?.email || '',
            phone: user?.phone || '',
        })
        console.log('update user');
        console.log(updateUser)

    }, []);
    useEffect(() => {

    }, [user]);

    const handleIconPress = () => {

    }
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };


    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            // onChangeImage(image);
            // setPostNovel({ ...postNovel, File: image.path });
            toggleBottomSheet();
        });
    }
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            //   onChangeImage(image);
            // setPostNovel({ ...postNovel, File: image.path });
            toggleBottomSheet();
        });
    }
    const handleUpdateUser = () => {
        console.log(updateUser.username)
    }
    const onChangeUsername = (username: string) => {
        setUpdateUser({
            ...updateUser, username: username
        })
        console.log(username)
    }


    return (
        <View style={styles.container}>
            <View style={styles.coverImgContainer}>
                <Image style={styles.coverImg} source={{ uri: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-bia-dep-10.jpg' }} />
                {/* <Icon name="photo" size={20} /> */}
                <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
                    <Icon name="camera" size={30} color={'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.avatar_container}>
                    <Image style={styles.avatar} source={{ uri: avatarImg }} />
                    <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
                        <Icon name="camera" size={30} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formGroup}>
                <View style={{ marginTop: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>Tên người dùng</Text>
                    <View style={styles.inputContainer} >
                        <TextInput value={updateUser.username} onChangeText={onChangeUsername} />
                    </View>

                </View>
            </View>
            <View style={styles.formGroup}>
                <View style={{ marginTop: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer} >
                        <TextInput value={updateUser.email} />
                    </View>

                </View>
            </View>
            <View style={styles.formGroup}>
                <View style={{ marginTop: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>Số điện thoại</Text>
                    <View style={styles.inputContainer} >
                        <TextInput value={updateUser.phone} />
                    </View>

                </View>
            </View>
            {/* <View style={styles.formGroup}>
                <View style={styles.selectGroup}>
                    <Text style={styles.label}>Giới tính</Text>
                    <TouchableOpacity>
                        <Text>Bí mật </Text>
                    </TouchableOpacity>
                </View>

            </View> */}
            <View style={{ marginTop: 10, width: '100%', alignItems: 'center', justifyContent: 'center', height: 70 }}>
                <View>
                    <Button title='Lưu' onPress={handleUpdateUser} />
                </View>

            </View>
        </View>
    );
};

export default EditProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        // flexDirection: 'column'

        //Container 1
    }, coverImgContainer: {
        // flex:1,
        height: '20%',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',

    }
    , iconContainer: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    }
    , coverImg: {
        height: '100%',
        width: '100%',
    },
    row: {
        backgroundColor: 'lightGray',
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar_container: {
        marginLeft: 10,
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        position: 'relative',
    },
    avatar: {
        marginLeft: 5,
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editBtnText: {
        margin: 1,
        color: 'black',
    }
    , lastRow: {
        backgroundColor: 'lightGray',
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    inforBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    formGroup: {
        width: '100%',
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 17,
        color: '#333'
    },
    usernameInput: {
        width: '95%',
        // height:70,
        borderRadius: 20,
        margin: 10,
    },
    inputContainer: {
        marginTop: 5,
        marginLeft: 15,
        width: '90%',
        alignSelf: 'flex-start',
        borderRadius: 15,
        overflow: 'hidden',
    },
    selectGroup: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center'
    }

});
