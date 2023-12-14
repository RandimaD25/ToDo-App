import express from "express";
import {Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

const prisma = new PrismaClient();

//create a todo
export const createTodo = async function(req: Request, res: Response) {
  const {id, description} = req.body;
  try{
    const newTodo = await prisma.todo.create({
      data: {
        id, 
        description,
      },
    });
    res.json(newTodo)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error"})
    
  }
};

//get all todos
export const getTodo = async function (req: Request, res: Response){
    try {
      const getTodo = await prisma.todo.findMany({
        
      });
      res.json(getTodo);
    } catch (error){
      console.log(error);
      res.status(500).json({error: "Internal server error"})
    }
    
    // res.json(getTodo)
}

//update a todo
export const updateTodo = async function (req: Request, res: Response){
  const todoId = parseInt(req.params.id,10);
  const {flag,description} = req.body;
  const parseFlag = JSON.parse(flag.toLowerCase())

  try {
    const updateTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
      flag: parseFlag,
      description:description
    }
    })  
    res.json("Successfully updated");
  }
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.log("Record to update does not exist.");
        
      }
    } 
    res.json(error);  
  }
}

//delete a todo
export const deleteTodo = async function (req: Request, res: Response){
  const todoID = parseInt(req.params.id);
  console.log(todoID);
  
  try{
      const deleteTodo = await prisma.todo.delete({
      where: {
        id: todoID,
      },
    })
    res.json("Successfully deleted");
  } 
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025'){
        console.log("Record to delete does not exist.");
      }
    }
    res.json(error)
  }
}