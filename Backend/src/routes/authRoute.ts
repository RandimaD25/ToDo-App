import express from "express"
import { 
    userRegistration,
    userLogin,
} from "../controllers/user.controllers";

const router = express.Router();

//routes
router.post('/register', (req, res) => {
    userRegistration(req, res).catch(err => {
        console.error(err);
        res.status(500).send('An error occured.')
    })
} );

router.post('/login', (req, res) => {
    userLogin(req, res).catch(err => {
        console.error(err);
        res.status(500).send('An error occured.')
    })
} );

export default router;