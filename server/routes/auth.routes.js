import express from 'express';
import { googleAuth } from '../controller/auth.controller.js';

const router = express.Router();

// Google OAuth route
router.post('/google', googleAuth);

export default router;