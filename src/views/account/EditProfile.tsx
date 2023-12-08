import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { User } from '../../models/User';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Pressable, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from 'react-native-image-crop-picker';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UpdateAccountApi } from '../../hook/AccountApi';

const EditProfile = ({ navigation }: any) => {

    // const [user, setUserData] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true)
    const { getUserData } = useContext(AuthContext);
    const [avatarImg, setAvatarImg] = useState('https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3')
    const user = getUserData()
    const [date, setDate] = useState(new Date())
    const [dateString, setDateString] = useState("");
    const [isShowDatePicker, setShowDatePicker] = useState(false);
    const [formReady, setFormReady] = useState(false);
    const authContext = useContext(AuthContext);
    const { authState } = useContext(AuthContext)
    const [updateUser, setUpdateUser] = useState<User>(
        {
            id: '',
            nickName: "",
            username: "",
            password: "",
            email: "",
            isAdmin: false,
            roleIds: ["READER"],
            birthday: new Date(),
            imagesURL: "",
            phone: "",
            walletAmmount: 0,
            isActive: true
        }
    )

    useEffect(() => {
        navigation.setOptions({
            title: ' Edit your profile',
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    handleUpdateUser()
                }} style={styles.buttonSave} >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            ),
        });
    });

    useEffect(() => {
        setFormReady(updateUser.nickName != "" && updateUser.email != "" && updateUser.imagesURL != "")
        // return () => {
        //     setFormReady(false);
        // }
        // if(formReady){

        // }
    }, [updateUser])
    useEffect(() => {
        if (user) {
            setUpdateUser(user);
            setLoading(false);
        }
    }, [user]);


    const handleIconPress = () => {

    }
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!isShowDatePicker);
    };
    const onChange = ({ type }: any, selectedDate: any) => {
        if (type == "set") {
            const currentDate = selectedDate
            setUpdateUser((prevUser) => ({
                ...prevUser,
                birthday: currentDate
            }))
            setDateString(currentDate.toDateString());
            if (Platform.OS === "android") {
                toggleDatePicker();
            }

        }
        else {
            toggleDatePicker();
        }
    }



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
    const handleUpdateUser = async () => {
        console.log(updateUser)
        const updateAccount = UpdateAccountApi(authContext);
        const res = await updateAccount(updateUser,authState.accessToken)
        console.log(res);

    }
    const onChangeUsername = (username: string) => {
        setUpdateUser({
            ...updateUser, username: username
        })
        console.log(username)
    }



    if (isLoading) {
        <ActivityIndicator size={"large"} color='#333' />
    }
    return (
        <View style={styles.container}>
            <View style={styles.coverImgContainer}>
                <Image style={styles.coverImg} source={{ uri: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-bia-dep-10.jpg' }} />
                {/* <Icon name="photo" size={20} /> */}
                {/* <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
                    <Icon name="camera" size={30} color={'white'} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.row}>
                <View style={styles.avatar_container}>
                    <Image style={styles.avatar} source={{ uri: user?.imagesURL }} />
                    <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
                        <Icon name="camera" size={30} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formGroup}>
                <View style={{ marginTop: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>Username</Text>
                    <View style={styles.inputContainer} >
                        <TextInput style={styles.input} value={updateUser.username} onChangeText={onChangeUsername} />
                    </View>
                </View>
            </View>
            <View style={styles.formGroup}>
                <View style={{ marginTop: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer} >
                        <TextInput style={styles.input} value={updateUser.email} />
                    </View>

                </View>
            </View>
            {/* <View style={styles.formGroup}>
                <View style={{ marginTop: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>Số điện thoại</Text>
                    <View style={styles.inputContainer} >
                        <TextInput value={updateUser.phone} />
                    </View>

                </View>
            </View> */}
            {/* Birthday */}
            <View style={styles.formGroup}>
                <View style={{ marginTop: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>Birthday</Text>
                    <View style={styles.inputContainer} >
                        <Pressable onPress={toggleDatePicker}>

                            <TextInput
                                style={styles.input}
                                placeholder='Wed Dec 4 2022'
                                value={dateString}
                                onChangeText={setDateString}
                                editable={false} />

                        </Pressable>
                    </View>
                    {isShowDatePicker && (
                        <DateTimePicker

                            mode="date"
                            display="spinner"
                            onChange={onChange}
                            value={date}
                        />
                    )}
                </View>
            </View>
            {/* <View style={{ marginTop: 10, width: '100%', alignItems: 'center', justifyContent: 'center', height: 70 }}>
                <View>
                    <Button title='Save' onPress={handleUpdateUser} />
                </View>

            </View> */}
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
        backgroundColor: '#FFF',
        marginTop: 5,
        marginLeft: 15,
        width: '90%',
        alignSelf: 'flex-start',
        borderRadius: 20,
        overflow: 'hidden',
    },
    input: {
        backgroundColor: '#FFF',
    },
    selectGroup: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff'
    },
    datePickerStyle: {
        width: '60%',
        borderRadius: 20,
        margin: 10,
    }
    ,
    // header:
    buttonSave: {
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#841584',
        padding: 10,

    }

});
