import express from "express";
import {
  submitContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contactController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, admin, getContacts);
router.put("/:id", protect, admin, updateContactStatus);

export default router;
