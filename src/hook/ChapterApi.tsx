import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
var RNFS = require('react-native-fs');
export const getChaptersByNovelId = async (novelId: any) => {

    try {
        const response = await axiosInstance.get(`/chapter/NovelId=${novelId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch chapter list by novel id");
    }
}

export const getChapterByChapterId = async (chapterId: any) => {

    try {
        const response = await axiosInstance.get(`/chapter/${chapterId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch chapter list by chapter id");
    }
}

export const postChapter = async (data: any) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*',
            'Authorization': `Bearer ${data.accessToken}`
        }
    }
    try {
        console.log(`${data.file.filePath}`);
        const formData = new FormData();
        formData.append('Name', data.name);
        formData.append('NovelId', data.novelId);
        // formData.append('File', {
        //     uri: 'file://' + RNFS.DocumentDirectoryPath + '/newChapter.pdf',
        //     name: 'newChapter.pdf',
        //     type: 'application/pdf',
        // });
    
        formData.append('File', {
            uri: 'file://'+ data.file.filePath,
            name: 'newChapter.pdf',
            type: 'application/pdf',
        });
        // formData.append('File', {
        //     // uri: data.file.filePath,
        //     uri: RNFS.DocumentDirectoryPath+'/newChapter.pdf',
        //     name: 'newChapter.pdf',
        //     type: 'application/pdf',
        //     data: data.file, // Append the PDF content
        // });
        // formData.append('File',data.file);
        const response = await axios.post('https://webnovelapi.azurewebsites.net/api/chapter', formData, {
            headers: {
                'Authorization': `Bearer ${data.accessToken}`,
                'Content-Type': "multipart/form-data",
                // 'Accept': '*',
            },
            // withCredentials: false, // Add this line
        });
        return response.data;
    } catch (error: any) {
        console.error("Error in postChapter:", error);
        // Log more details about the error
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up the request:", error.message);
        }
        // throw new Error("Failed to fetch chapter list by chapter id");
    }
}