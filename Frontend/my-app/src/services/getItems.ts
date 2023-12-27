import axiosInstance from './api/axiosInstance'
import authHeader from './auth/auth.header';

export async function getItems () {
        const {data,status} = await axiosInstance.get("/getTodo", {headers: authHeader()});
        console.log("datais",status)
        return Array(data)
    
}
