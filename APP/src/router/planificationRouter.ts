import { Router } from "express";
import { createPlanification, deletePlanification } from "../controller/planificationController.js";

const router = Router();

router.post( '/create', createPlanification );

router.post( '/delete/:_id', deletePlanification );

export default router;