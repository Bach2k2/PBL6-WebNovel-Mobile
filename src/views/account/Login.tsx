import React from 'react';
import { Dimensions, View } from 'react-native';
import { Image, ImageBackground, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const heigthWindow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;
const Login = ({ navigation }: { navigation: any }) => {
    return (
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../assets/background/background1.jpg')}>
            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <View style={{ width: '100%', height: '20%', marginTop: 0.1 * heigthWindow, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/img/logo-login.png')} style={styles.logo} />
                </View>

                <View style={{ width: '100%', height: '20%', marginTop: 0.1 * heigthWindow, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { }} style={styles.googleBtn}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Image style={styles.googleBtnImage} source={require('../../assets/logo/google.png')} />
                            <Text style={styles.googleText}>Login with Google</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.facebookBtn}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon name='facebook' size={30} color="white" style={styles.facebookIcon} />
                            <Text style={styles.facebookText}>Login with Facebook</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.roundButtonsContainer}>
                    {/* Add your 4 round buttons here */}
                    <TouchableOpacity style={styles.zaloRoundBtn}>
                        <Image style={styles.roundButtonImage} source={require('../../assets/logo/zalo.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lineRoundBtn}>
                        <Image style={styles.roundButtonImage} source={require('../../assets/logo/line.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.twitterRoundBtn}>
                        <Icon name='twitter' size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton}>
                        <Icon name='gmail' size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{borderBottomColor: 'gray', borderBottomWidth: 1}} onPress={() => {
                    navigation.navigate('Register');
                }}>
                    <Text style={styles.createAccountText}>Create an account</Text>
                </TouchableOpacity>
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
    logo: {
        width: 240,
        height: 240,
    },
    googleBtn: {
        // width: '70%',
        width: '80%',
        height: '40%',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        color: 'black'
    },
    googleBtnImage: {
        marginLeft: 10,
        width: 30,
        height: 30,
    },
    googleText: {
        marginLeft: 40,
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
    },
    facebookBtn: {
        width: '80%',
        height: '40%',
        backgroundColor: "#3b5998",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 10,
    },
    facebookIcon: {
        marginLeft: 10,
    },
    facebookText: {
        marginLeft: 40,
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    },
    roundButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginTop: 20,
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'gray', // Change the background color as needed
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },

    zaloRoundBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    roundButtonImage: {
        width: 50, // Adjust the width and height to fit the round button
        height: 50, // Adjust the width and height to fit the round button
        borderRadius: 50,
    },
    lineRoundBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    twitterRoundBtn: {
        width: 50, // Adjust the width and height to fit the round button
        height: 50, // Adjust the width and height to fit the round button
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1da1f2',
    }
    , createAccountText: {
        color: '#FFFFFF',
        marginTop: 20,
        fontSize: 18,
    }
});
export default Login;