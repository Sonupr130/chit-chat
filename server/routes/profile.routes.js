import express from 'express';
import { 
  createOrUpdateProfile, 
  getProfile 
} from '../controllers/profile.controller.js';
import { uploadAvatar } from '../controllers/avatar.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';

const router = express.Router();

// Profile routes
router.route('/profile')
  .get(authMiddleware, getProfile)
  .post(authMiddleware, createOrUpdateProfile);

// Avatar upload route
router.post(
  '/avatars/upload', 
  authMiddleware, 
  uploadMiddleware.single('avatar'), 
  uploadAvatar
);

export default router;