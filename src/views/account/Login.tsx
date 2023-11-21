import React, { useLayoutEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { Image, ImageBackground, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { BlurView } from '@react-native-community/blur';
GoogleSignin.configure(
    {
        //scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
        // webClientId: '953071676402-ok21i770o5754ovmce51e9sgch5la9di.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        webClientId: '1022621922641-e7tpkjpkbaiu2fl2j7lsv67umjvv6mug.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: '', // specifies a hosted domain restriction
        //forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        //accountName: 'letrongbach02@gmail.com', // [Android] specifies an account name on the device that should be used
    }
);

const heigthWindow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;

const Login = ({ navigation }: { navigation: any }) => {

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         header: () => <CustomBlurredHeader />,
    //     });
    // }, [navigation]);

    // const CustomBlurredHeader = () => {
    //     return (
    //         <BlurView
    //             style={[styles.header, { zIndex: 100 }]}
    //             blurType="light"
    //             blurAmount={10}
    //             reducedTransparencyFallbackColor="white"
    //         >
    //             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    //                 <Icon name="arrow-left" size={25} color="white" />
    //             </TouchableOpacity>
    //             <Text style={styles.headerText}>Login</Text>
    //         </BlurView>
    //     );
    // };
    const handleLoginByEmail = () => {
        navigation.navigate('LoginByEmail');
        console.log('handleLoginByEmail');
    }
    // const setupSocial =async ()=> {
    //     GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    //     GoogleSignin.configure({
    //         webClientId: '922650223041-5ngaleu67dg66prv8njel5e7atmdmtae.apps.googleusercontent.com',
    //         // iosClientId: Config.IOS_CLIENT_ID,
    //         offlineAccess: true,
    //     })
    // }
    const googleLogin = async () => {
        console.log('googleLogin');
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            console.log("google signin ", { userInfo });

        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("signin cancelled");
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("signin in progress");
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("signin google play services not enabled or outdated");
            } else {
                // some other error happened
                console.log("signin error", error);
            }
        }

    }


    return (
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../assets/background/background1.jpg')}>
            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <View style={{ width: '100%', height: '20%', marginTop: 0.1 * heigthWindow, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/img/logo-login.png')} style={styles.logo} />
                </View>

                <View style={{ width: '100%', height: '20%', marginTop: 0.1 * heigthWindow, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { googleLogin() }} style={styles.googleBtn}>
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
                    <TouchableOpacity style={styles.roundButton} onPress={handleLoginByEmail}>
                        <Icon name='gmail' size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} onPress={() => {
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
    },


    // header:
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    headerText: {
        fontSize: 18,
        color: 'white',
    },
    backButton: {
        marginRight: 16,
    },
});
export default Login;