import axios from "axios";
import { serverURL, axiosInstance } from './AxiosInstance.js'
const getNovelData = async () => {
    try {
        const response = await axiosInstance.get(serverURL+'/api/novel');
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};

export default getNovelData;


