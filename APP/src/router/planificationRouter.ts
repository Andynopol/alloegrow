import { Router } from "express";
import { createPlanification, deletePlanification, getPlanificationForUser } from "../controller/planificationController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get( '/get/:userId', auth, getPlanificationForUser );

router.post( '/create', auth, createPlanification );

router.post( '/delete/:_id', auth, deletePlanification );

export default router;