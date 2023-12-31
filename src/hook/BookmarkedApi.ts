import axios from "axios";
import { axiosInstance } from './AxiosInstance'
import { AuthContext } from "../context/AuthContext.js";
import { useContext } from "react";
import { User } from "../models/User.js";
import { ToastAndroid } from "react-native";
const getBookmarkedData = async (user: User, accessToken: any) => {
    console.log("user", user.id);
    console.log("accessToken", accessToken);
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axiosInstance.get(`/bookmarkeds/AccountId=${user.id}`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch bookmarked data");
    }
};
export const postBookmarkData = async (userId: any, novelId: any, chapterId: any, accessToken: any) => {

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    };
    const postData = {
        novelId: novelId,
        accountId: userId,
        chapterId: chapterId
    };
    try {
        const response = await axiosInstance.post('bookmarkeds/', postData, axiosConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
};

export const putBookmarkData = async (userId: any, novelId: any, chapterId: any, accessToken: any) => {

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    };
    const postData = {
        novelId: novelId,
        accountId: userId,
        chapterId: chapterId
    };
    try {
        const response = await axiosInstance.put('bookmarkeds/', postData, axiosConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
};
export const deleteBookmarkApi = async (userId: any, novelId: any, accessToken: any) => {

    const deleteData = {
        novelId: novelId,
        accountId: userId,
    };
    const axiosConfig = {

        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    console.log(userId, novelId, accessToken);

    try {
        const response = await axiosInstance.delete('bookmarkeds/', { data: deleteData, ...axiosConfig });
        return response.data;
    } catch (error) {
        console.error(error);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
};


export default getBookmarkedData;

