import { Router } from "express";
import { listen } from "../controller/listenerController.js";

const router = Router();

router.post( '/listeners', listen );

export default router;