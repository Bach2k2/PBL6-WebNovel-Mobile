import React, { useState } from 'react';
import { Dimensions, View ,Keyboard} from 'react-native';
import { Image, ImageBackground, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const HeigthWindow = Dimensions.get('window').height;
const WidthWindow = Dimensions.get('window').width;
const Register = ({ navigation }: { navigation: any }) => {
    const [showPasswordStatus, SetShowPasswordStatus] = useState(false);
    const [contentHeight, setContentHeight] = useState(HeigthWindow);
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

    return (
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../assets/background/background1.jpg')}>
            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/img/welcome.png')} style={styles.logo} />
                </View>

                <View style={[styles.content, {height: contentHeight}]}>
                    <Text style={styles.header}>Tạo tài khoản</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.textboxContainer}>
                            <Icon style={styles.iconInput} name='email' size={30} />
                            <TextInput style={styles.textInput} placeholder='Nhập email ở đây' />
                        </View>

                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.textboxContainer}>
                            <Icon style={styles.iconInput} name='lock' size={30} />
                            <TextInput style={styles.textInput} placeholder='Nhập mật khẩu ở đây' />
                            <TouchableOpacity onPress={() => { SetShowPasswordStatus(!showPasswordStatus) }}>
                                {showPasswordStatus ? (
                                    <Image style={styles.passwordShow} source={require('../../assets/logo/show.png')} />
                                ) : (
                                    <Image style={styles.passwordShow} source={require('../../assets/logo/hide.png')} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.warningContainer}>
                        <Icon name='alert' size={20} />
                        <Text style={styles.warningText}>Phải dài 6-18 ký tự</Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => { }} style={styles.btnNext}>
                            <Text>Tiếp tục</Text>
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
        height: '20%', marginTop: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    logo: {
        width: '80%',
        height: '100%',
    },
    header: {
        fontSize: 20, color: 'black',
        marginTop: 10, marginLeft: 10,
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
    }, btnNext: {
        width: '100%',
        height: '100%',
        borderWidth: 1, borderColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
export default Register;