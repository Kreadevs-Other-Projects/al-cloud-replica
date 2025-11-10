import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 100);
    const t = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json(t);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Failed to load testimonials" });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
