import { Request, Response } from "express";
import {
  createTodoService,
  getTodoService,
  updateTodoService,
  deleteTodoService,
} from "../services/todo.service";

import { IError } from "../interfaces/error.interface";
import { IRequestWithUser } from "../interfaces/userRequest.interface.js";


//create todo controller
export const createTodo = async function (req: Request, res: Response) {
  const { description } = req.body;

  try {
    const user = (req as IRequestWithUser).user as {userId: number};
    const newTodo = await createTodoService(description, user.userId);
    res.json(newTodo);
  } catch (error: unknown) {
    if ((error as IError).message) {
      res.status(500).json({ error: (error as IError).message });
    } else {
      throw error
    }
  }
};

//get todo controller
export const getTodo = async function (req: Request, res: Response) {
  try {
    const user = (req as IRequestWithUser).user as {userId: number};
        const todos = await getTodoService(user.userId);
    return res.json(todos);
  } catch (error: unknown) {
    if ((error as IError).message) {
      res.status(500).json({ error: (error as IError).message });
    } else {
      throw error
    }
  }
};

//update todo controller
export const updateTodo = async function (req: Request, res: Response) {
  const todoId = parseInt(req.params.id, 10);

  try {
    const user = (req as IRequestWithUser).user as { userId: number };
    const message = await updateTodoService(todoId, user.userId);
    res.json(message);
  } catch (error: unknown) {
    if ((error as IError).message) {
      res.status(500).json({ error: (error as IError).message });
    } else {
      throw error
    }
  }
};

//delete todo controller
export const deleteTodo = async function (req: Request, res: Response) {
  const todoID = parseInt(req.params.id);
  console.log(todoID);

  try {
    const user = (req as IRequestWithUser).user as { userId: number };
    const message = await deleteTodoService(todoID, user.userId);
    res.json(message);
  } catch (error: unknown) {
    if ((error as IError).message) {
      res.status(500).json({ error: (error as IError).message });
    } else {
      throw error
    }
  }
};

