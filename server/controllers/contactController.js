// controllers/contactController.js
import Contact from "../models/Contact.js";
import { contactSchema } from "../utils/contactValidator.js";
import { clean } from "../utils/sanitize.js";
import { sendContactEmail } from "../utils/mailer.js";

export const submitContact = async (req, res) => {
  try {
    const parsed = contactSchema.parse(req.body);

    if (parsed.website && parsed.website.trim() !== "") {
      return res.status(204).end();
    }

    const payload = {
      name: clean(parsed.name),
      email: clean(parsed.email),
      phone: clean(parsed.phone),
      subject: clean(parsed.subject),
      message: clean(parsed.message),
      meta: {
        ip: req.ip,
        ua: req.headers["user-agent"],
        ref: req.headers.referer || "",
      },
    };

    const c = await Contact.create(payload);
    sendContactEmail(payload).catch(() => {});

    res.status(201).json(c);
  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json({ message: "Invalid fields", issues: err.issues });
    }
    res.status(400).json({ message: err.message || "Failed to submit" });
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
