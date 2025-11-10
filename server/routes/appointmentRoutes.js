import express from "express";
import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAvailability,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAppointments);
router.post("/", createAppointment);
router.get("/availability", getAvailability);
router.put("/:id", protect, updateAppointmentStatus);
router.delete("/:id", protect, deleteAppointment);

export default router;
