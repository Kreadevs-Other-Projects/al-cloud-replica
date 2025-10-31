import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const c = await Contact.create(req.body);
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getContacts = async (req, res) => {
  const list = await Contact.find().sort({ createdAt: -1 });
  res.json(list);
};

export const updateContactStatus = async (req, res) => {
  const c = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(c);
};
