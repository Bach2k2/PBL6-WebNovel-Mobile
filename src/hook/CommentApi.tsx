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