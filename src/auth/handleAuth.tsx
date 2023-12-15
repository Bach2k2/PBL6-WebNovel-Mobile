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

    const userData = await GetAccountApi(userId, accessToken);
    // userData.birthday= new Date(userData.birthday);// Đổi là hợp lý
    await authContext.setUserData(userData); // thành công, đã check
    return userData;
}



