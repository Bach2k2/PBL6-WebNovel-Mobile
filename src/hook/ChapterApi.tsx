import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
export const getChaptersByNovelId = async (novelId: any) => {
   // console.log('param: ', novelId);
    try {
        const response = await axiosInstance.get(`/chapter/NovelId=${novelId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch chapter list by novel id");
    }
}

export const getChapterByChapterId = async (chapterId: any) => {
    //console.log('param: ', chapterId);
    try {
        const response = await axiosInstance.get(`/chapter/${chapterId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch chapter list by chapter id");
    }
}