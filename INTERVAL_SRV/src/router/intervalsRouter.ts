import { Router } from "express";
import { getIntervalsForUser } from "../controller/intervalsControllers.js";

const router = Router();

router.get( '/:_id', getIntervalsForUser );

export default router;