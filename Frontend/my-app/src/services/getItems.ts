import axiosInstance from './api/axiosInstance'
  
export async function getItems () {
        const {data,status} = await axiosInstance.get("/getTodo");
        console.log("datais",status)
        return Array(data)
    
}
getItems();