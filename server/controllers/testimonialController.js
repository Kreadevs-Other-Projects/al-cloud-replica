import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res) => {
  const t = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(t);
};

export const createTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
