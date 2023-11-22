import React, { useEffect, useLayoutEffect } from 'react';
import { Button, Dimensions, View } from 'react-native';
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

    // Making the blur headers.
    useEffect(() => {
        navigation.setOptions({
            header: () => <CustomBlurredHeader />,
        });
    }, [navigation]);

    const CustomBlurredHeader = () => {
        return (
            <View
                style={styles.header}
            // blurType="light"
            // blurAmount={0}
            // reducedTransparencyFallbackColor="white"
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={25} color="white" />
                </TouchableOpacity>
            </View>
        );
    };
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
        <ImageBackground style={styles.container} source={require('../../../assets/background/background1.jpg')}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/img/logo-login.png')} style={styles.logo} />
                </View>

                {/* Google and Facebook buttons */}
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity onPress={() => { googleLogin() }} style={styles.googleBtn}>
                        <View style={styles.socialButtonContent}>
                            <Image style={styles.googleBtnImage} source={require('../../../assets/logo/google.png')} />
                            <Text style={styles.googleText}>Login with Google</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.facebookBtn}>
                        <View style={styles.socialButtonContent}>
                            <Icon name='facebook' size={30} color="white" style={styles.facebookIcon} />
                            <Text style={styles.facebookText}>Login with Facebook</Text>
                        </View>

                    </TouchableOpacity>
                </View>

                {/*Round buttons*/}
                <View style={styles.roundButtonsContainer}>
                    {/* Add your 4 round buttons here */}
                    <TouchableOpacity style={styles.zaloRoundBtn}>
                        <Image style={styles.roundButtonImage} source={require('../../../assets/logo/zalo.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lineRoundBtn}>
                        <Image style={styles.roundButtonImage} source={require('../../../assets/logo/line.png')} />
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
        justifyContent: 'center',   
    },
    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginBottom:25,
    },
    logoContainer: {
        flex:0.5,
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
    },
    logo: {
       // alignSelf:'center',
        width: 250,
        height: 250,
    },
    socialButtonsContainer: {
        width: '100%',
        height: '20%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleBtn: {
        width: '80%',
        height: '40%',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
       // justifyContent: 'center',
        color: 'black'
    },
    socialButtonContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    googleBtnImage: {
        marginLeft: 20,
        width: 35,
        height: 35,
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
        marginLeft: 20,
        width: 35,
        height: 35,
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
export default Login;