import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const getBookmarkedData = async () => {
    // const authContext = useContext(AuthContext);
    // const accessToken = authContext.getAccessToken();
    // const axiosConfig = {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // }; , axiosConfig
    try {
        const response = await axiosInstance.get('/bookmarkeds');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch bookmarked data");
    }
};

export default getBookmarkedData;

