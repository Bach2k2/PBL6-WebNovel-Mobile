import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import { LoginWithGoogleApi } from '../hook/LoginApi';
import { handleAuth } from './handleAuth';
GoogleSignin.configure(
    {

        webClientId: '1022621922641-e7tpkjpkbaiu2fl2j7lsv67umjvv6mug.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    }
);

export const handleLoginByGG = async (authContext: any) => {

    if (await GoogleSignin.isSignedIn() === true)
        await GoogleSignin.signOut();
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        //   console.log('ui',userInfo)
        const response = await LoginWithGoogleApi(userInfo);
        const userData = await handleAuth({ authContext, response });
        userData.imagesURL = userInfo.user.photo;
        console.log('ui', userData)
        Toast.show({
            type: 'success',
            text1: 'Login Notification!',
            text2: 'Login successfully👋'
        });
        // await GoogleSignin.signOut();
        return userData;

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


export default handleLoginByGG

const styles = StyleSheet.create({})