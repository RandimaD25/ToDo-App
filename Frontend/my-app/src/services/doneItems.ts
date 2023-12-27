import axiosInstance from "./api/axiosInstance";
import authHeader from "./auth/auth.header";

export const doneItems = async (id: number, flag: boolean): Promise<void> => {
    await axiosInstance.put(`/updateTodo/${id}`,{}, {headers: authHeader()})
}