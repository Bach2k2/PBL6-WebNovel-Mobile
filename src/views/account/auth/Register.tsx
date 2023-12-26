import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, View, Keyboard } from 'react-native';
import { Image, ImageBackground, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RegisterApi from '../../../hook/RegisterApi';
const HeigthWindow = Dimensions.get('window').height;
const WidthWindow = Dimensions.get('window').width;
import Toast from 'react-native-toast-message';
import { AxiosContext } from '../../../context/AxiosContext';
const Register = ({ navigation }: { navigation: any }) => {
    const [isTouchableEnabled, setIsTouchableEnabled] = useState(false);
    const [showPasswordStatus, SetShowPasswordStatus] = useState(false);
    const [contentHeight, setContentHeight] = useState(HeigthWindow);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [message, setMessage] = useState('');
    const { publicAxios } = useContext(AxiosContext)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const updateContentHeight = () => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setContentHeight(HeigthWindow / 2); // You can adjust the height as needed
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setContentHeight(HeigthWindow);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    };

    // Call the function to update content height when the component mounts
    React.useEffect(updateContentHeight, []);

    const handleRegister = async () => {
        // console.log(email,password);
        if (!emailRegex.test(email)) {
            setEmailMessage("Email không hợp lệ");
            setMessage('');
            setIsTouchableEnabled(false);
            return;
        }

        await RegisterApi(publicAxios, email, password).then((response) => {
            console.log(response.code);
            const code = response.code
            if (code == 202) {
                setEmailMessage('Email này đã được sử dụng');
                return;
            }
            Toast.show({
                type: 'success',
                text1: 'Register Notification!',
                text2: 'Register successfully👋'
            });
            navigation.navigate('Login');
        }).catch((error) => {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'Register unsuccessfully'
            });
        })
    }
    useEffect(() => {
        // if fill password first
        if (password.length >= 6) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }

        if (email && password.length >= 6) {
            setValidEmail(true);
            setValidPassword(true);
            setIsTouchableEnabled(true);

        } else {
            setValidEmail(false);
            setValidPassword(false);
            setIsTouchableEnabled(false);
        }
    }, [email, password]);

    //setHeader
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
    return (
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../../assets/background/background1.jpg')}>
            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/img/welcome.png')} style={styles.logo} />
                </View>

                <View style={[styles.content, { height: contentHeight }]}>
                    <Text style={styles.header}>Tạo tài khoản</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.textboxContainer}>
                            <Icon style={styles.iconInput} name='email' size={30} />
                            <TextInput style={styles.textInput} placeholder='Nhập email ở đây'
                                onChangeText={(email) => {
                                    setEmailMessage('')
                                    setEmail(email)
                                }} />
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
                                secureTextEntry={!showPasswordStatus} />
                            <View style={styles.passwordShowContainer} >
                                <TouchableOpacity onPress={() => { SetShowPasswordStatus(!showPasswordStatus) }}>
                                    <Image style={styles.passwordShow} source={showPasswordStatus ? require('../../../assets/logo/show.png') : require('../../../assets/logo/hide.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.warningContainer}>
                        {!validPassword ? (<Icon name='alert' size={20} />) : (<Icon name='check' size={20} />)}
                        <Text style={styles.warningText}>Phải dài 6-18 ký tự</Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={handleRegister} style={[
                            styles.btnRegister,
                            isTouchableEnabled ? null : styles.btnLoginDisabled,
                        ]} disabled={!isTouchableEnabled}>
                            <Text style={[
                                styles.registerText, isTouchableEnabled ? { color: 'white' } : null]}>Đăng ký</Text>
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
        height: '20%', marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    logo: {
        //position: 'relative',
        marginTop: 20,
        width: '80%',
        height: '100%',
    },
    header: {
        fontSize: 20, color: 'black',
        marginTop: 10, marginLeft: 10,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
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
        justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: '#EEEEEE'
    },
    iconInput: {
        marginLeft: 10,

    },
    textInput: {
        marginLeft: 10,
    },
    passwordShow: {
        width: 30,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 0,
        marginLeft: 100,
    }, warningContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    warningText: {
        marginLeft: 5,
        color: 'gray',
        fontSize: 12,
    }, btnContainer: {
        width: '90%',
        height: 50,
        margin: 15
    }, btnRegister: {
        width: '100%',
        height: '100%',
        borderWidth: 1, borderColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4285f4',
    },
    registerText: {
        color: 'gray',
        fontSize: 17,
        fontWeight: '700'
    },
    btnLoginDisabled: {
        backgroundColor: '#b5b5b5',
        color: '#FFFFFF'
    }, passwordShowContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
        flex: 1,
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
export default Register;