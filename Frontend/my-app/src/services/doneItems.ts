import axiosInstance from "./api/axiosInstance";

export const doneItems = async (id: number, flag: boolean): Promise<void> => {
    const doneItem = await axiosInstance.put(`/updateTodo/${id}`)
}