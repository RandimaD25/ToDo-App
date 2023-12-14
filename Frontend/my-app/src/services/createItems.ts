import axiosInstance from "./api/axiosInstance";

export const createItems = async (newTask: {description: string}): Promise<void> => {
    const response = await axiosInstance.post('/createTodo', newTask);
    if (!response.data){
            throw new Error('No data received after creation.')
    }
}


