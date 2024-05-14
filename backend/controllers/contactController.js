const contactModel = require("../models/contactModel");

const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();

    if (contacts.length === 0) {
      return res.status(400).json({
        message: "No record found to fetch",
      });
    }

    res.status(200).json({
      message: "Contacts retrieved successfully.",
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in fetching contacts: ${error.message}`,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await contactModel.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found.",
      });
    }

    await contactModel.findByIdAndDelete(contactId);

    res.status(200).json({
      message: "Contact deleted successfully.",
      deletedContact: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in deleting contact: ${error.message}`,
    });
  }
};

module.exports = {
  getContacts,
  deleteContact,
};
