import { Router } from "express";
import { loginUser, registerUser, deleteUser, authCheck } from "../controller/userController.js";
import cors from 'cors';

const router = Router();

router.post( '/login', loginUser );

router.post( '/register', registerUser );

router.post( '/auth', cors(), authCheck );

router.delete( '/delete/:_id', deleteUser );

export default router;