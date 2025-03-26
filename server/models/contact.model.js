// models/contact.model.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'blocked'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Compound index to ensure unique pairs
contactSchema.index({ user: 1, contact: 1 }, { unique: true });

export const Contact = mongoose.model('Contact', contactSchema);
export default Contact;