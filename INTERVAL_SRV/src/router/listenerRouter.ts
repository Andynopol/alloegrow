import { Router } from "express";
import { listen } from "../controller/listenerController.js";
import cors from 'cors';

const router = Router();

router.post( '/listeners', cors(), listen );

export default router;