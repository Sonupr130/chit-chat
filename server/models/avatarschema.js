// models/avatar.model.js
const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  url: { type: String, required: true }, // URL to the stored image
  thumbnailUrl: { type: String }, // Optional thumbnail version
  storageKey: { type: String }, // Key used in storage service (S3, etc.)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Avatar', avatarSchema);