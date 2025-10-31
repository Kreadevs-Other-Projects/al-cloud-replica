import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    icon: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
