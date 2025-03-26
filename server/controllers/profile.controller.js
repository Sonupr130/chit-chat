import User from '../models/user.model.js';

// Create or update user profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const { name, email, bio, dateOfBirth, avatar } = req.body;
    
    const profile = await User.findOneAndUpdate(
      { email },
      { name, bio, dateOfBirth, avatar },
      { new: true, upsert: true }
    );
    
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      error: error.stack 
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const { email } = req.user; // Assuming you have auth middleware
    const profile = await User.findOne({ email });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error',
      error: error.stack 
    });
  }
};