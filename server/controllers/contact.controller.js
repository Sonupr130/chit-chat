import Contact  from '../models/contact.model.js';
import User from '../models/user.model.js';

// Add contact
export const addContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    
    if (req.user._id.equals(contactId)) {
      return res.status(400).json({ message: 'Cannot add yourself as contact' });
    }

    const contactUser = await User.findById(contactId);
    if (!contactUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingContact = await Contact.findOne({
      user: req.user._id,
      contact: contactId
    });

    if (existingContact) {
      return res.status(400).json({ message: 'Contact already exists' });
    }

    const newContact = await Contact.create({
      user: req.user._id,
      contact: contactId,
      status: 'pending'
    });

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add contact', error: error.message });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected', 'blocked'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { user: req.user._id, contact: contactId },
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
  }
};