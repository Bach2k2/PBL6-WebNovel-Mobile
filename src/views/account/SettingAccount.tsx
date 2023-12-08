import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { User } from '../../models/User';
import { Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
// import { signOut } from '../../auth/handleAuth';
const SettingAccount = ({ navigation }: any) => {
    // const navigation = useNavigation()

    const [user, setUserData] = useState<User | null>(null);
    const { getUserData } = useContext(AuthContext);
    const authContext = useContext(AuthContext);
    // const userData = getUserData();
    const handleAuthButton = () => {
        if (user) {
            Alert.alert('Alert', 'Confirm to sign out', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Sign out', onPress: () => {
                        authContext.logout()
                        navigation.navigate('Account')
                    }
                },
            ]);


        } else {
            navigation.navigate('Login')
        }
    }
    useEffect(() => {
        navigation.setOptions({
            title: 'Settings',
            headerStyle: {
                //color:'white',
                backgroundColor: 'white',
            }
        })
    })
    useEffect(() => {
        setUserData(getUserData());
        console.log(user);
    }, []);
    useEffect(() => {
        console.log(user);
    }, [user]); // Lắng nghe sự thay đổi của user và thực hiện hành động khi user thay đổi

    return (
        <SafeAreaView style={styles.myContainer}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.textRow}>Notifications</Text>
                </View>
                <View style={styles.linePadding}>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textRow}>Languages</Text>
                </View>
                <View style={styles.linePadding}>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textRow}>About WebNovel</Text>
                </View>
                <View style={styles.linePadding}>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textRow}>Clear Cache</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    handleAuthButton();
                }}>
                    <Text style={styles.signInBtn}>{user ? 'Sign Out' : 'Sign In'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SettingAccount;
const styles = StyleSheet.create({
    myContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#333',
    },
    container: {
        marginTop: 5,
        borderRadius: 20,
        // borderTopRightRadius: 10,
        flex: 1,
        width: '97%',
        height:'auto',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    row: {
        // backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
    },
    linePadding: {
        backgroundColor: '#EBEBEB',
        width: '100%',
        height: 1,
        justifyContent: 'center',
    },
    textRow: {
        margin: 10,
        color: '#333',
        fontSize: 18,
    }, signInBtn: {
        margin: 10,
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    }



});
