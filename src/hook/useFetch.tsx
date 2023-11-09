import { useEffect, useState } from "react"
import axios from "axios"
const useFetch =(endpoint:any)=>{
    const [isLoading, setIsLoading]= useState(false);
    const [data,setData]= useState([]);
    const [error,setError]= useState(null);
    const options ={
        method: "GET",
        url:`http://127.0.0.1:5125/api/${endpoint}`,
        headers:{
            
        },
        // params:{...query},
    };

    const fecthData = async()=>{
        setIsLoading(true);
        try{
            const response = await axios.request(options);
            console.log(response);
            setData(response.data.data);
            setIsLoading(false);
        }catch(error:any){
            setError(error);
            setIsLoading(false);
        }finally{
            setIsLoading(true);
        }
    }
    useEffect(()=>{
        fecthData();
    },[]);

    const refetch=()=>{
        setIsLoading(true);
        fecthData();
    }
    return {data,isLoading,error,refetch};
}
export default useFetch;

