import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//create a todo
export const createTodoService = async (description: string, userId: number) => {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        userId: userId,
        description,
      },
    });
    return newTodo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//get all todos
export const getTodoService = async (userId: number) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {userId: userId},
      select: {
        id: true,
        description: true,
        flag: true,
      }
    })
    console.log("get todo: ", todos);
    
    return todos;
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

//update a todo
export const updateTodoService = async (todoId: number, userId: number) => {
  try {
    await prisma.todo.update({
      where: {
        id: todoId,
        userId: userId
      }, 
      data: {
        flag: true,
      },
    });
    return "Successfully updated";
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          console.log("Record to update does not exist");
          
          throw new Error("Record to update does not exist.")
        }
      }
      throw error;
  }
};

//delete a todo
export const deleteTodoService = async (todoID: number, userId: number) => {
  try {
    await prisma.todo.delete({
      where: {
        id: todoID,
        userId: userId
      },
    });
    return "Successfully deleted";
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log("Record to delete does not exist.");
        throw new Error("Record to delete does not exist.")
      }
    }
    throw error;
  }
};