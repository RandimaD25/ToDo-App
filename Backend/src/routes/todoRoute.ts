import express from "express"
import { createTodo, getTodo, updateTodo, deleteTodo } from "../controllers/index";

const router = express.Router();

//routes
router.post('/createTodo', createTodo);
router.get('/getTodo', getTodo);
router.delete('/deleteTodo/:id', deleteTodo);
router.put('/updateTodo/:id', updateTodo);


export default router;