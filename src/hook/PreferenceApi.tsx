import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
import {View, StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { User } from "../models/User.js";
// import Toast from "react-native-toast-message";
const getPreferenceData = async (user: User, accessToken: any) => {

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axiosInstance.get(`preferences/AccountId=${user.id}`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch preferences data");
    }
};

export const postPreferenceData = async (userId: any, novelId: any, accessToken: any) => {
 
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    };
    const postData = {
        novelId: novelId,
        accountId: userId,
    };
    try {
        const response = await axiosInstance.post('preferences/', postData, axiosConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
};

export default getPreferenceData;

