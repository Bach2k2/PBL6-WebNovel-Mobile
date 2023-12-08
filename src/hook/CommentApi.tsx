import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'

export const getCommentFromNovelId = async (novelId: string) => {
    try {
        const response = await axiosInstance.get(`/comments/NovelId=${novelId}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const postCommentApi= async (data:any,accessToken:any) => {
    try {
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': "application/json",
                'Accept': '*',
            },
        };
        const response = await axiosInstance.post('/comments/',data,axiosConfig);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}