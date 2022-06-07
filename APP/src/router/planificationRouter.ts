import { Router } from "express";
import { createPlanification, deletePlanification, getPlanificationForUser } from "../controller/planificationController.js";

const router = Router();

router.get( '/get/:userId', getPlanificationForUser );

router.post( '/create', createPlanification );

router.post( '/delete/:_id', deletePlanification );

export default router;