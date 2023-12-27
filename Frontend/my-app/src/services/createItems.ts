import axiosInstance from "./api/axiosInstance";
import authHeader from "./auth/auth.header";

export const createItems = async (newTask: {description: string}): Promise<void> => {
    const response = await axiosInstance.post('/createTodo', newTask, {headers: authHeader()});
    if (!response.data){
            throw new Error('No data received after creation.')
    }
}


