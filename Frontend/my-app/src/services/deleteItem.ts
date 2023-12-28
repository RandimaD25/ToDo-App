import axios, { AxiosError } from "axios";
import axiosInstance from "./api/axiosInstance";
import authHeader from "./auth/auth.header";

export const deleteItems = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/deleteTodo/${id}`, {headers: authHeader()})

        if (!response.data) {
            throw new Error('No response received after deletion');
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            throw new Error(`Failed to delete the todo item: ${axiosError.message}`);
        } else {
            throw new Error (`Failed to delete the todo item: ${error}`);
        }
    }
    
}
