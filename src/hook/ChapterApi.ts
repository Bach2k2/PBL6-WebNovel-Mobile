import axios from "axios";
import { axiosInstance } from './AxiosInstance'
var RNFS = require('react-native-fs');
// export const getChaptersByNovelId = async (novelId: any) => {

//     try {
//         const response = await axiosInstance.get(`/chapter/NovelId=${novelId}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Failed to fetch chapter list by novel id");
//     }
// }
// export const getChaptersByAccountId= async (accountId:any,novelId: any) => {

//     try {
//         const response = await axiosInstance.get(`/chapter/accountId=${accountId}/NovelId=${novelId}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Failed to fetch chapter list by novel id");
//     }
// }

export const getChapters = async (user: any, novelId: any, accessToken: any) => {

    if (user) {
        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }
            console.log('Get chapter while login ')
            const response = await axiosInstance.get(`/chapter/accountId=${user.id}/NovelId=${novelId}`, config);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch chapter list by novel id");
        }
    } else {
        try {
            console.log('Get chapter while not login ')
            const response = await axiosInstance.get(`/chapter/NovelId=${novelId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch chapter list by novel id");
        }
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
            uri: 'file://' + data.file.filePath,
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

export const editChapterApi = async (data: any) => {

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
        formData.append('Id', data.novelId);
        formData.append('Discount', data.discount); // Add your form fields with appropriate values
        formData.append('FeeId', data.feeId);
        formData.append('IsPublished', data.isPublished);
        formData.append('Views', data.views);
        formData.append('IsLocked', data.isLocked);
        formData.append('ApprovalStatus', data.approvalStatus);

        formData.append('File', {
            uri: 'file://' + data.file.filePath,
            name: 'newChapter.pdf',
            type: 'application/pdf',
        });

        const response = await axios.put('https://webnovelapi.azurewebsites.net/api/chapter', formData, {
            headers: {
                'Authorization': `Bearer ${data.accessToken}`,
                'Content-Type': "multipart/form-data",

            },
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

export const unlockChapterApi = async (data: any) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*',
            'Authorization': `Bearer ${data.accessToken}`
        }
    }
    try {
        const formData = new FormData();
        formData.append('ChapterId', data.chapterId);
        formData.append('AccountId', data.accountId);
        const response = await axios.put('https://webnovelapi.azurewebsites.net/api/chapter/unlock-chapter', formData, config);
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

