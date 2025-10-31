import express from "express";
import upload from "../config/multer.js";
import { singleUpload } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("file"), singleUpload);

export default router;
