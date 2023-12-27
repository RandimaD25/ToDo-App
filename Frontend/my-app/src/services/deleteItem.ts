import axiosInstance from "./api/axiosInstance";
import authHeader from "./auth/auth.header";

export const deleteItems = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/deleteTodo/${id}`, {headers: authHeader()})
}
