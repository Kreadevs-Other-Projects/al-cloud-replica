import mongoose from "mongoose";

const slugify = (s = "") =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, maxlength: 500 },
    content: { type: String },
    coverImage: { type: String },
    category: { type: String, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

blogSchema.pre("validate", async function (next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (!this.isModified("slug")) return next();
  const exists = await this.constructor.exists({
    slug: this.slug,
    _id: { $ne: this._id },
  });
  if (exists)
    this.slug = `${this.slug}-${Math.random().toString(36).slice(2, 6)}`;
  next();
});

blogSchema.index({ title: "text", excerpt: "text", content: "text" });

export default mongoose.model("Blog", blogSchema);
