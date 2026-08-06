import Contact from "../models/Contact.js";

const createContact = async (data) => {
  return await Contact.create(data);
};

const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const markAsRead = async (id) => {
  return await Contact.findByIdAndUpdate(
    id,
    { isRead: true },
    {
      returnDocument: "after",
    }
  );
};

const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const getUnreadCount = async () => {
  return await Contact.countDocuments({
    isRead: false,
  });
};

export default {
  createContact,
  getAllContacts,
  getContactById,
  markAsRead,
  deleteContact,
  getUnreadCount,
};