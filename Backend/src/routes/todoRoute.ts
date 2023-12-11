import express from "express"
import { createTodo, getTodo, updateTodo, deleteTodo } from "../controllers/index";

const router = express.Router();
console.log('randia asm');

//routes
router.post('/createTodo', createTodo);
router.get('/getTodo', getTodo);
router.delete('/deleteTodo', deleteTodo);
router.put('/updateTodo', updateTodo);


export default router;