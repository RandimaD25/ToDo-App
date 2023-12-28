import axios, { AxiosError } from "axios";
import axiosInstance from "./api/axiosInstance";
import authHeader from "./auth/auth.header";

export const createItems = async (newTask: {
  description: string;
}): Promise<void> => {
  try {
    const response = await axiosInstance.post("/createTodo", newTask, {
      headers: authHeader(),
    });
    if (!response.data) {
      throw new Error("No data received after creation.");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to create a todo item: ${axiosError.message}`);
    }
    else if (error instanceof Error) {
        throw new Error(`Failed to create a todo item: ${error.message}`);
    }
    else if (typeof error === 'string') {
        throw new Error(`Failed to create a todo item: ${error}`);
    }
    else {
        throw new Error(`Failed to create a todo item`);
    }

  }
};
