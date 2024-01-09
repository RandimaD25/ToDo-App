import express from "express"
import { 
    userRegistration,
    userLogin,
} from "../controllers/user.controllers";

const router = express.Router();

//routes
router.post('/register', userRegistration);
router.post('/login', userLogin);

export default router;