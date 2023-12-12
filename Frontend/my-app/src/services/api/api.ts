import axios, { AxiosResponse } from "axios";
import { TodoType } from "../models/todo-interface";

const instance = axios.create({
    baseURL: "http://localhost:3000.com/",
    timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
    put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Post = {
    getPost: (): Promise<TodoType[]> => requests.get("posts"),
    getAPost: (id: number): Promise<TodoType> => requests.get(`posts/${id}`),
    createPost: (post: TodoType): Promise<TodoType> => requests.post("posts", post),
    updatePost: (post: TodoType, id: number): Promise<TodoType> => requests.put(`posts/${id}`, post),
    deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};