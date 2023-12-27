import axiosInstance from './api/axiosInstance'
import authHeader from './auth/auth.header';

export async function getItems () {
        const {data,status} = await axiosInstance.get<TodoType[]>("/getTodo", {headers: authHeader()});
        console.log("dStatus: ",status)
        console.log("Data: ", data)
        return data
    
}
