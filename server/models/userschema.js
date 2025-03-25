// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  providerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' }, // Reference only
  status: { type: String, default: 'offline' },
  lastSeen: { type: Date, default: Date.now },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);