import { v2 as cloudinary } from 'cloudinary';
import User from '../models/user.model.js';

// Configure Cloudinary (or your storage service)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      width: 150,
      height: 150,
      crop: 'fill'
    });
    
    // Update user profile with new avatar
    const { email } = req.user;
    await User.findOneAndUpdate(
      { email },
      { avatar: result.secure_url }
    );
    
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ 
      message: 'Upload failed',
      error: error.stack 
    });
  }
};