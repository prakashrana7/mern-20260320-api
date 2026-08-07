import contactService from "../services/contact.service.js";

const createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);

    res.status(201).json({
      message: "Message sent successfully.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send contact message. Server is unavailable.",
    });
  }
};

const getAllContacts = async (req, res) => {
  const contacts = await contactService.getAllContacts();

  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  if (!contact) {
    return res.status(404).json({
      message: "Contact message not found.",
    });
  }

  res.json(contact);
};

const markAsRead = async (req, res) => {
  const contact = await contactService.markAsRead(req.params.id);

  res.json(contact);
};

const deleteContact = async (req, res) => {
  await contactService.deleteContact(req.params.id);

  res.json({
    message: "Contact message deleted successfully.",
  });
};

const getUnreadCount = async (req, res) => {
  const count = await contactService.getUnreadCount();

  res.json(count);
};

export default {
  createContact,
  getAllContacts,
  getContactById,
  markAsRead,
  deleteContact,
  getUnreadCount,
};