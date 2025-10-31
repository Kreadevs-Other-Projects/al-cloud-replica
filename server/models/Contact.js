import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
