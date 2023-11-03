import axios from "axios";
// import serverURL from './AxiosInstance.js'
// import axiosInstance from './AxiosInstance.js'
import { serverURL, axiosInstance } from './AxiosInstance.js'
const subpath = '/api/genres'
const getGenreData = async () => {
    try {
        const response = await axiosInstance.get(serverURL+subpath);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};

export default getGenreData;


