import express from "express"

import { createTodo, getTodo, updateTodo, deleteTodo } from "../controllers/todo.controllers";
import { validateToken } from "../middlewares/validateToken";

const router = express.Router();

//routes
router.post('/createTodo',validateToken, createTodo);
router.get('/getTodo',validateToken, getTodo);
router.delete('/deleteTodo/:id',validateToken, deleteTodo);
router.put('/updateTodo/:id',validateToken, updateTodo);

export default router;