import User from '../models/userschema.js';
import { OAuth2Client } from 'google-auth-library';

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Handles Google OAuth authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const googleAuth = async (req, res) => {
  try {
    const { token, user: googleUser } = req.body;

    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    // Additional verification - ensure email matches
    if (payload.email !== googleUser.email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email mismatch in authentication' 
      });
    }

    // Check if user exists in database
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        provider: 'google',
        providerId: payload.sub,
        emailVerified: payload.email_verified,
      });
      
      await user.save();
    } else if (user.provider !== 'google') {
      // User exists but didn't use Google auth previously
      return res.status(400).json({
        success: false,
        error: 'This email is already registered with another method',
      });
    }

    // Generate JWT token for session
    const authToken = generateAuthToken(user);

    // Return success response with user data
    res.status(200).json({
      success: true,
      token: authToken,
      user: formatUserResponse(user),
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Generates JWT token for authenticated user
 * @param {Object} user - User document from DB
 * @returns {String} JWT token
 */
const generateAuthToken = (user) => {
  // Implement your JWT token generation logic here
  // Example using jsonwebtoken:
  // return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return 'generated-jwt-token'; // Replace with actual implementation
};

/**
 * Formats user data for response
 * @param {Object} user - User document from DB
 * @returns {Object} Formatted user data
 */
const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  username: user.username,
  isProfileComplete: !!user.username,
  emailVerified: user.emailVerified,
});