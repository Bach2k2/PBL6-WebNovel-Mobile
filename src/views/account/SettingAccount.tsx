import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { User } from '../../models/User';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const SettingAccount = () => {
    const navigation = useNavigation()

    const [user, setUserData] = useState<User | null>(null);
    const { getUserData } = useContext(AuthContext);
    const authContext = useContext(AuthContext);
    // const userData = getUserData();

    useEffect(() => {
        setUserData(getUserData());
        console.log(user);
    }, []);
    useEffect(() => {
        console.log(user);
    }, [user]); // Lắng nghe sự thay đổi của user và thực hiện hành động khi user thay đổi

    return (
        <View style={styles.container}>
            {
                user ? (<Button title='Đăng xuất' onPress={() => {
                    // const logout =asyn
                    authContext.logout();
                    navigation.navigate('Account')
                }}></Button>):(<Button title='Đăng nhập' onPress={() => {
                    // const logout =asyn
                    // authContext.logout();
                    navigation.navigate('Login')
                }}></Button>)

            }

        </View>
    );
};

export default SettingAccount;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'column'
    }, coverImgContainer: {
        height: '20%',
        width: '100%',
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
    },
    avatar: {
        marginLeft: 5,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    funcBtn: {
        flexDirection: 'row',
        width: '50%',
        height: '100%',
        // backgroundColor: 'green'
    },
    likeBtn: {
        margin: 10,
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 3,
    },
    likeBtnIcon: {
        margin: 1,
        width: 25,
        height: 25,
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    editBtn: {
        margin: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
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
    }

});
