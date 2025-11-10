import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Service from "../models/Service.js";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(String(id));

export const getAppointments = async (req, res) => {
  const appts = await Appointment.find()
    .populate("doctor", "name specialty")
    .populate("service", "title")
    .sort({ createdAt: -1 });
  res.json(appts);
};

export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      patientEmail,
      patientPhone,
      doctor,
      service,
      date,
      notes,
    } = req.body;

    if (!patientName || !doctor || !service || !date) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    if (!isValidObjectId(doctor) || !isValidObjectId(service)) {
      return res.status(400).json({ message: "Invalid doctor/service id." });
    }

    const [doc, svc] = await Promise.all([
      Doctor.findById(doctor),
      Service.findById(service),
    ]);
    if (!doc || !doc.isActive)
      return res.status(400).json({ message: "Doctor not available." });
    if (!svc || !svc.isActive)
      return res.status(400).json({ message: "Service not available." });

    const when = new Date(date);
    if (Number.isNaN(when.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }
    if (when.getTime() < Date.now() - 60_000) {
      return res
        .status(400)
        .json({ message: "Date/time must be in the future." });
    }

    const conflict = await Appointment.findOne({
      doctor,
      date: when,
      status: { $ne: "cancelled" },
    });
    if (conflict) {
      return res
        .status(409)
        .json({ message: "This time slot is already booked for the doctor." });
    }

    const appt = await Appointment.create({
      patientName,
      patientEmail,
      patientPhone,
      doctor,
      service,
      date: when,
      notes,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json(appt);
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ message: "Slot just got booked. Pick another time." });
    }
    res
      .status(400)
      .json({ message: err.message || "Could not create appointment." });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
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

export const getAvailability = async (req, res) => {
  const { doctor, day } = req.query;
  if (!isValidObjectId(doctor) || !day)
    return res.status(400).json({ message: "Invalid query." });

  const start = new Date(`${day}T00:00:00.000Z`);
  const end = new Date(`${day}T23:59:59.999Z`);

  const taken = await Appointment.find({
    doctor,
    date: { $gte: start, $lte: end },
    status: { $ne: "cancelled" },
  }).select("date -_id");

  res.json({ taken: taken.map((t) => t.date) });
};
