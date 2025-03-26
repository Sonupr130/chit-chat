// auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }
    
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // 4. Attach user to request
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Authentication error:', error);
    
    // Handle specific JWT errors
    let message = 'Not authorized';
    if (error.name === 'TokenExpiredError') {
      message = 'Session expired, please login again';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token';
    }
    
    res.status(401).json({ 
      success: false,
      message,
      error: error.message 
    });
  }
};

export default authenticate;