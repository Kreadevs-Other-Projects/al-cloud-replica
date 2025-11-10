import Doctor from "../models/Doctor.js";

export const getDoctors = async (req, res) => {
  try {
    const { q, specialty, active = "true", page = 1, limit = 24 } = req.query;

    const filter = {};
    if (active === "true") filter.isActive = true;
    if (specialty)
      filter.specialty = { $regex: `^${specialty}$`, $options: "i" };
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { specialty: { $regex: q, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Doctor.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Doctor.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const d =
      (await Doctor.findOne({ slug: req.params.slug })) ||
      (await Doctor.findById(req.params.slug));
    if (!d) return res.status(404).json({ message: "Doctor not found" });
    res.json(d);
  } catch {
    res.status(400).json({ message: "Invalid doctor id/slug" });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const d = await Doctor.create(req.body);
    res.status(201).json(d);
  } catch (err) {
    res.status(400).json({ message: err.message || "Could not create doctor" });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const d = await Doctor.findById(req.params.id);
    if (!d) return res.status(404).json({ message: "Doctor not found" });
    d.set(req.body);
    await d.save();
    res.json(d);
  } catch (err) {
    res.status(400).json({ message: err.message || "Could not update doctor" });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor removed" });
  } catch {
    res.status(400).json({ message: "Could not delete doctor" });
  }
};
