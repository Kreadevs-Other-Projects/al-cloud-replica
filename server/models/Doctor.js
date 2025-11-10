import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, unique: true, index: true },
    specialty: { type: String, required: true, trim: true, index: true },
    about: { type: String, default: "", maxlength: 3000 },
    image: { type: String, default: "" },
    experience: { type: Number, default: 0, min: 0, max: 80 },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
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

doctorSchema.pre("validate", async function (next) {
  if (!this.isModified("name") && this.slug) return next();
  const base = toSlug(this.name);
  if (!base) return next();
  let candidate = base,
    n = 1;
  while (
    await mongoose.models.Doctor.exists({
      slug: candidate,
      _id: { $ne: this._id },
    })
  ) {
    candidate = `${base}-${n++}`;
  }
  this.slug = candidate;
  next();
});

export default mongoose.model("Doctor", doctorSchema);
