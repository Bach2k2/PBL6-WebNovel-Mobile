import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { User } from "../models/User.js";
const getPreferenceData = async (user: User, accessToken: any) => {
    console.log("user", user.id);
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
        throw new Error("Failed to fetch bookmarked data");
    }
};

export const postPreferenceData = async (userId: any, novelId: any, accessToken: any) => {
    console.log("userId", userId);
    console.log("novelId: ", novelId);
    console.log("access toekn: ", accessToken);
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
        console.log(JSON.stringify(response))
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post post preferences data");
    }
};

export default getPreferenceData;

