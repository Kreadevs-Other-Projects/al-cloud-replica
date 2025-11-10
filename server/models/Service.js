import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, unique: true, index: true },
    description: { type: String, default: "", trim: true, maxlength: 1000 },
    icon: { type: String, default: "🩺" },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

function toSlug(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

serviceSchema.pre("validate", async function (next) {
  if (!this.isModified("title") && this.slug) return next();

  let base = toSlug(this.title);
  if (!base) return next();

  let candidate = base;
  let n = 1;
  while (
    await mongoose.models.Service.exists({
      slug: candidate,
      _id: { $ne: this._id },
    })
  ) {
    candidate = `${base}-${n++}`;
  }
  this.slug = candidate;
  next();
});

export default mongoose.model("Service", serviceSchema);
