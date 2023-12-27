import express from "express"
import { 
    createTodo, 
    getTodo, 
    updateTodo, 
    deleteTodo, 
    userRegistration,
    userLogin,
    validateToken
} from "../controllers/index";

const router = express.Router();

//routes
router.post('/createTodo',validateToken, createTodo);
router.get('/getTodo',validateToken, getTodo);
router.delete('/deleteTodo/:id',validateToken, deleteTodo);
router.put('/updateTodo/:id',validateToken, updateTodo);
router.post('/register', userRegistration);
router.post('/login', userLogin);

export default router;