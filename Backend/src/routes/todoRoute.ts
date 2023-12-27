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
router.post('/createTodo', createTodo);
router.get('/getTodo',validateToken, getTodo);
router.delete('/deleteTodo/:id', deleteTodo);
router.put('/updateTodo/:id', updateTodo);
router.post('/register', userRegistration);
router.post('/login', userLogin);

export default router;