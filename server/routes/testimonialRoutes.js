import express from "express";
import {
  getTestimonials,
  createTestimonial,
} from "../controllers/testimonialController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", protect, admin, createTestimonial);

export default router;
