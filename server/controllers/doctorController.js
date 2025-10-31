import Doctor from "../models/Doctor.js";

export const getDoctors = async (req, res) => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.json(doctors);
};

export const createDoctor = async (req, res) => {
  try {
    const doc = await Doctor.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateDoctor = async (req, res) => {
  const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(doc);
};

export const deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor removed" });
};
