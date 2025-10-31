import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    designation: String,
    message: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatar: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
