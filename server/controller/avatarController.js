// controllers/avatar.controller.js
import Avatar from '../models/avatarschema.js';
import User from '../models/userschema.js';
const fs = require('fs');
const path = require('path');

// Upload avatar (example using local storage)
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user._id;
    
    // Delete previous avatar if exists
    await Avatar.deleteOne({ userId });
    
    // Create new avatar record
    const avatar = new Avatar({
      userId,
      url: `/uploads/avatars/${req.file.filename}`,
      storageKey: req.file.filename
    });
    
    await avatar.save();
    
    // Update user reference
    await User.findByIdAndUpdate(userId, { avatarRef: avatar._id });
    
    res.status(201).json(avatar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get avatar by user ID
export const getAvatar = async (req, res) => {
  try {
    const avatar = await Avatar.findOne({ userId: req.params.userId });
    
    if (!avatar) {
      return res.status(404).json({ error: 'Avatar not found' });
    }
    
    res.json(avatar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};