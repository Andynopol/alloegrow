import { Router } from "express";
import { getIntervalsForUser } from "../controller/intervalsControllers.js";
import cors from 'cors';

const router = Router();

router.get( '/:_id', cors(), getIntervalsForUser );

export default router;