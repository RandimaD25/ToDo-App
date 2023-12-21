import express from "express"
import { 
    createTodo, 
    getTodo, 
    updateTodo, 
    deleteTodo, 
    // generateToken, 
    // validateToken,
    userRegistration,
    userLogin
} from "../controllers/index";

const router = express.Router();

//routes
router.post('/createTodo', createTodo);
router.get('/getTodo', getTodo);
router.delete('/deleteTodo/:id', deleteTodo);
router.put('/updateTodo/:id', updateTodo);
router.post('/register', userRegistration);
router.post('/login', userLogin);

export default router;