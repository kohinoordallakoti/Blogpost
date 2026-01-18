import Contact from "../model/contactSchema.js";

export const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
