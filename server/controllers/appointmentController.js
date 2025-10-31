import Appointment from "../models/Appointment.js";

export const getAppointments = async (req, res) => {
  const appts = await Appointment.find()
    .populate("doctor")
    .populate("service")
    .sort({ createdAt: -1 });
  res.json(appts);
};

export const createAppointment = async (req, res) => {
  try {
    const appt = await Appointment.create({
      ...req.body,
      createdBy: req.user ? req.user._id : null,
    });
    res.status(201).json(appt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  const appt = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(appt);
};

export const deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment deleted" });
};
