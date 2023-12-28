import axios, { AxiosError } from "axios";
import axiosInstance from "./api/axiosInstance";
import authHeader from "./auth/auth.header";

export const doneItems = async (id: number, flag: boolean): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/updateTodo/${id}`,{}, {headers: authHeader()});

        if (!response.data) {
            throw new Error('No response received after update')
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            throw new Error(`Failed to update todo item: ${axiosError.message}`);
        }
        else if (error instanceof Error) {
            throw new Error(`Failed to update todo item: ${error.message}`);
        }
        else if (typeof error === 'string') {
            throw new Error (`Failed to update todo item: ${error}`);
        }
        else {
            throw new Error(`Failed to update todo item`)
        }
    }
}