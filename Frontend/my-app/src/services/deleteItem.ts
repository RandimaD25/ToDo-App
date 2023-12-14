import axiosInstance from "./api/axiosInstance";

export const deleteItems = async (id: number): Promise<void> => {
    const deleteItem = await axiosInstance.delete(`/deleteTodo/${id}`)
}
