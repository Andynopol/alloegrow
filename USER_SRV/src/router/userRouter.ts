import { Router } from "express";
import { loginUser, registerUser, deleteUser, authCheck } from "../controller/userController.js";


const router = Router();

router.post( '/login', loginUser );

router.post( '/register', registerUser );

router.post( '/auth', authCheck );

router.delete( '/delete/:_id', deleteUser );

export default router;