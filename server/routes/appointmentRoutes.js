import express from "express";
import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAppointments).post(createAppointment);
router
  .route("/:id")
  .put(protect, updateAppointmentStatus)
  .delete(protect, deleteAppointment);

export default router;
