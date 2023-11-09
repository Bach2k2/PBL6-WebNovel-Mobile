import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
export const getNovelData = async () => {
    try {
        const response = await axiosInstance.get('/novel');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};
export const getNovelById = async (novelId:any) => {
    console.log('param: ',novelId);
    try {
        const response = await axiosInstance.get(`/novel/${novelId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data detail");
    }
}
// export default { getNovelData, getNovelById };


