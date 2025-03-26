import  User  from '../models/user.model.js';
import  Avatar  from '../models/avatar.model.js';
import  Contact  from '../models/contact.model.js';


// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    
    const user = await User.findById(userId).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const avatar = await Avatar.findOne({ user: userId }).select('url');
    
    res.json({
      ...user.toObject(),
      avatar: avatar?.url || null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create or update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, dateOfBirth, bio } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, dateOfBirth, bio },
      { new: true, runValidators: true }
    ).select('-__v');

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
};

// Get user contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id, status: 'accepted' })
      .populate('contact', 'name email status lastSeen')
      .lean();

    // Get avatars for all contacts
    const contactIds = contacts.map(c => c.contact._id);
    const avatars = await Avatar.find({ user: { $in: contactIds } }).select('user url');

    const contactsWithAvatars = contacts.map(contact => {
      const avatar = avatars.find(a => a.user.equals(contact.contact._id));
      return {
        ...contact,
        contact: {
          ...contact.contact,
          avatar: avatar?.url || null
        }
      };
    });

    res.json(contactsWithAvatars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};