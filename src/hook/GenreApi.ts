import axios from "axios";
import { axiosInstance } from './AxiosInstance'
const subpath = '/genres'
const getGenreData = async () => {
    try {
        const response = await axiosInstance.get(subpath);

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};

export default getGenreData;


