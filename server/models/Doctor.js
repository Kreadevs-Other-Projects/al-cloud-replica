import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    about: String,
    image: String,
    experience: Number,
    email: String,
    phone: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
