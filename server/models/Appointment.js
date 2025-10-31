import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientEmail: { type: String },
    patientPhone: { type: String },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // CSR
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
