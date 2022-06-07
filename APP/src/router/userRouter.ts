import { Router } from "express";
import { deleteUser, loginUser, registerUser } from '../controller/userController.js';

const router = Router();

router.post( '/login', loginUser );

router.post( '/register', registerUser );

router.delete( '/delete/:_id', deleteUser );

export default router;