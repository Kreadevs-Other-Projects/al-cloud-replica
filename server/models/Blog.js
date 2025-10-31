import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: String,
    content: String,
    coverImage: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
