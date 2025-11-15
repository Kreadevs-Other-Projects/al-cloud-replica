import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import upload from "../config/multer.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getBlogs)
  .post(protect, admin, upload.single("coverImage"), createBlog);
router.get("/slug/:slug", getBlogBySlug);
router
  .route("/:id")
  .put(protect, admin, upload.single("coverImage"), updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
