import express from 'express';
import {
  getUserProfile,
  updateProfile,
  getContacts
} from '../controllers/user.controller.js';
import {
  uploadAvatar,
} from '../controllers/avatar.controller.js';
import {
  addContact,
  updateContactStatus
} from '../controllers/contact.controller.js';
import upload  from '../middlewares/upload.middleware.js';
import {authenticate}  from '../middlewares/auth.middleware.js';

const router = express.Router();

// User routes
router.get('/profile/:userId?', authenticate, getUserProfile);
router.put('/profile', authenticate, updateProfile);

// Avatar routes
router.post('/avatar', authenticate, upload.single('avatar'), uploadAvatar);
// router.get('/avatar/:userId', authenticate, getAvatar);
// router.delete('/avatar', authenticate, deleteAvatar);

// Contact routes
router.get('/contacts', authenticate, getContacts);
router.post('/contacts', authenticate, addContact);
router.patch('/contacts/:contactId', authenticate, updateContactStatus);

export default router;