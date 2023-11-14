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

export default getPreferenceData;

