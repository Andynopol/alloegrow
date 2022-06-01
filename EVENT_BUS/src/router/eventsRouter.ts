import { Router } from 'express';
import { dispatchEvent } from '../controller/eventsController.js';

const router = Router();

router.post( '/dispatch', dispatchEvent );

export default router;