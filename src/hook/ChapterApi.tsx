import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
export const getChaptersByNovelId = async (novelId: any) => {
    console.log('param: ', novelId);
    try {
        const response = await axiosInstance.get(`/chapter/NovelId=${novelId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch chapter list by novel id");
    }
}