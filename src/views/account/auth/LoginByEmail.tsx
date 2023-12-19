import React, { useEffect, useRef, useState, useContext } from 'react';
import { Dimensions, View, Keyboard } from 'react-native';
import { Image, ImageBackground, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginApi } from '../../../hook/LoginApi';
import { AuthContext } from '../../../context/AuthContext';
import { AxiosContext } from '../../../context/AxiosContext';
import * as Keychain from 'react-native-keychain';
import { JwtPayload, jwtDecode } from "jwt-decode";
import GetAccountApi from '../../../hook/AccountApi';
import Toast from 'react-native-toast-message';

const HeightWindow = Dimensions.get('window').height;
const WidthWindow = Dimensions.get('window').width;


const LoginByEmail = ({ navigation }: { navigation: any }) => {
    const authContext = useContext(AuthContext);
    const { publicAxios } = useContext(AxiosContext);
    const [emailMessage, setEmailMessage] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef<TextInput | null>(null);
    const [isTouchableEnabled, setIsTouchableEnabled] = useState(false);
    const [showPasswordStatus, SetShowPasswordStatus] = useState(false);
    const [contentHeight, setContentHeight] = useState(HeightWindow);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    useEffect(() => {
        navigation.setOptions({
            header: () => <CustomBlurredHeader />
        });
    }, [navigation])

    const CustomBlurredHeader = () => {
        return (
            <View
                style={styles.customHeader}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={25} color="white" />
                </TouchableOpacity>
            </View>
        );
    };

    const updateContentHeight = () => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setContentHeight(HeightWindow / 2); // You can adjust the height as needed
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setContentHeight(HeightWindow);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    };

    useEffect(updateContentHeight, []);

    useEffect(() => {
        if (email && password) {
            setEmailMessage('');
            setMessage('');
            setIsTouchableEnabled(true);
        } else {
            setIsTouchableEnabled(false);
        }
    }, [email, password]);

    const handleLogin = async () => {
        if (!emailRegex.test(email)) {
            setEmailMessage("Email không hợp lệ");
            setMessage('');
            setIsTouchableEnabled(false);
            return;
        }
        try {

            const response = await LoginApi(
                email, password
            );

            const accessToken = response.token;
            const refreshToken = response.refreshToken

            authContext.setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
            });

            await Keychain.setGenericPassword(
                'accessToken',
                JSON.stringify({
                    accessToken,
                    refreshToken,
                }),
            );
            // console.log("Access Token:" + accessToken);
            type jwtpayload = {
                "aud": string,
                "emailaddress": string,
                "exp": number,
                "iss": number,
                "nameidentifier": string
            }
            const decoded = jwtDecode<jwtpayload>(accessToken)

            const userId = decoded.nameidentifier;

            console.log(userId);
            await GetAccountApi(userId, accessToken).then((userData) => {
                authContext.setUserData(userData); // thành công, đã check
                Toast.show({
                    type: 'success',
                    text1: 'Login Notification!',
                    text2: 'Login successfully👋'
                });
                navigation.navigate('Account', userData);
            }).catch((e) => console.log(e));
            //  console.log(userData);


        } catch (error: any) {
            console.log(error);
            setMessage("Tài khoản hoặc mật khẩu không chính xác, vui lòng kiểm tra lại")
            // Alert.alert('Login Failed', error.response.data.message);
        }
    };

    return (
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../../assets/background/background1.jpg')}>
            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/img/welcome.png')} style={styles.logo} />

                </View>

                <View style={[styles.content, { height: contentHeight }]}>
                    <Text style={styles.header}>Đăng nhập</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.textboxContainer}>
                            <Icon style={styles.iconInput} name='email' size={30} />
                            <TextInput style={styles.textInput} placeholder='Nhập email ở đây' onChangeText={(email) => setEmail(email)} />
                        </View>
                    </View>
                    {
                        emailMessage ? (
                            <View style={styles.warningContainer}>
                                <Icon name='alert' size={20} color={'red'} />
                                <Text style={styles.warningText}>{emailMessage}</Text>
                            </View>
                        ) :
                            (<View></View>)
                    }


                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.textboxContainer}>
                            <Icon style={styles.iconInput} name='lock' size={30} />
                            <TextInput style={styles.textInput}
                                placeholder='Nhập mật khẩu ở đây'
                                onChangeText={(password) => setPassword(password)}
                                secureTextEntry={!showPasswordStatus} ref={passwordRef} />
                            <View style={styles.passwordShowContainer} >
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => { SetShowPasswordStatus(!showPasswordStatus) }}>
                                    <Image style={styles.passwordShow} source={showPasswordStatus ? require('../../../assets/logo/show.png') : require('../../../assets/logo/hide.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {
                        message ? (
                            <View style={styles.warningContainer}>
                                <Icon name='alert' size={20} color={'red'} />
                                <Text style={styles.warningText}>{message}</Text>
                            </View>
                        ) :
                            (<View></View>)
                    }


                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={handleLogin} style={[
                            styles.btnLogin,
                            isTouchableEnabled ? null : styles.btnLoginDisabled,
                        ]} disabled={!isTouchableEnabled}>
                            <Text style={[styles.loginText, isTouchableEnabled ? { color: '#FFFFFF' } : null]}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => { }} style={styles.btnForgotPassword}>
                            <Text style={styles.forgotPassText}>QUÊN MẬT KHẨU?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView >
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    logoContainer: {
        width: '100%',
        height: '20%',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    logo: {
        //position: 'absolute',
        marginTop: 20,
        width: '80%',
        height: '100%',
    },
    header: {
        fontSize: 20, color: 'black',
        marginTop: 15, marginLeft: 15,
        fontWeight: 'bold'
    },
    content: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    label: {
        fontSize: 17,
        color: 'black',
        marginLeft: 5,
        fontWeight: '500'
    },
    inputContainer: {
        width: '90%',
        height: 80,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 2,
        flexDirection: 'column',
        // justifyContent: 'flex-start', alignItems: 'center',
    },
    textboxContainer: {
        width: '100%',
        height: 40,
        flex: 1, flexDirection: 'row',
        borderWidth: 1, borderColor: 'black',
        borderRadius: 10,
        marginTop: 5, marginLeft: 5,
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        alignSelf: 'flex-start',
    },
    iconInput: {
        marginLeft: 10,

    },
    textInput: {
        marginLeft: 10,
    },
    passwordShowContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
    },
    passwordShow: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        marginRight: 5,
    }, warningContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
    },
    warningText: {
        marginLeft: 5,
        marginTop: 5,
        color: 'red',
        fontSize: 13,
    }, btnContainer: {
        width: '90%',
        height: 50,
        margin: 15,
        marginTop: 20,
        marginBottom: 5,

    }, btnLogin: {
        width: '100%',
        height: '100%',
        borderWidth: 1, borderColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4285f4',
        color: 'white'
    },
    btnLoginDisabled: {
        backgroundColor: '#b5b5b5',
        color: '#FFFFFF'
    },
    loginText: {
        color: 'gray',
        fontSize: 17,
        fontWeight: '700'
    },
    forgotPassText: {
        fontSize: 18,
        fontWeight: '600'
    }
    , btnForgotPassword: {
        marginBottom: 20,
        width: '100%',
        height: '50%',
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //header:
    customHeader: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        zIndex: 100,
    },
    headerText: {
        fontSize: 18,
        color: 'white',
    },
    backButton: {
        margin: 20,
        marginRight: 16,
        zIndex: 100,
    },

});
export default LoginByEmail;