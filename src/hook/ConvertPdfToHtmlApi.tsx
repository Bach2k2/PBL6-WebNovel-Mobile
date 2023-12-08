import axios from "axios"

export const convertPdfToHtml = async (data: FormData) => {
    const apiUrl = 'https://v2.convertapi.com/convert/pdf/to/html';
    const secretKey = 'nbUwoTRPuZIif8bA';
    const config = {
        headers: {
            // ...data.getHeaders(),
            'Content-Type': 'multipart/form-data',
            'Accept': '*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        },
        "withCredentials": true
    }
    try {
        const res = await axios.post(apiUrl + `?Secret=${secretKey}`, data, config);
        console.log('r', res.data);
        return res.data;
    } catch (err) {
        console.log(err);

    }
}