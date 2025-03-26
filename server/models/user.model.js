// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  provider: { 
    type: String, 
    required: true,
    enum: ['google', 'facebook', 'auth0'] // Example providers
  },
  providerId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  dateOfBirth: { 
    type: Date 
  },
  bio: {
    type: String,
    maxlength: 500
  },
  status: { 
    type: String, 
    enum: ['online', 'offline', 'away'],
    default: 'offline' 
  },
  lastSeen: { 
    type: Date, 
    default: Date.now 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

export const User = mongoose.model('User', userSchema);
export default User;