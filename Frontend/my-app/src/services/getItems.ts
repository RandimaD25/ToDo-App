import axiosInstance from "./api/axiosInstance";
import authHeader from "./auth/auth.header";

export async function getItems() {
  try {
    const { data, status } = await axiosInstance.get<TodoType[]>("/getTodo", {
      headers: authHeader(),
    });
    console.log("dStatus: ", status);
    console.log("Data: ", data);
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the items: ", error);
    throw error;
  }
}
