import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { jwtDecode } from 'jwt-decode';
import GetAccountApi from '../hook/AccountApi';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const handleAuth = async ({ authContext, response }: any) => {
    // const authContext = useContext(AuthContext);
    console.log(response);
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
    const accountApi = GetAccountApi(authContext);
    const userData = await accountApi(userId, accessToken);
    await authContext.setUserData(userData); // thành công, đã check
    return userData;
}


// export const signOut = async ({authContext}:any) => {
//     try {
//         await GoogleSignin.revokeAccess();
//         await GoogleSignin.signOut();
//         authContext.logout();
//         //   auth()
//         //     .signOut()
//         //     .then(() => alert('Your are signed out!'));
//         //   setloggedIn(false);
//         // setuserInfo([]);
//     } catch (error) {
//         console.error(error);
//     }
// };


// export default handleAuth

