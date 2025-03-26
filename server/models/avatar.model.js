// models/avatar.model.js
import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  storageKey: { 
    type: String,
    required: true 
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

export const Avatar = mongoose.model('Avatar', avatarSchema);
export default Avatar;