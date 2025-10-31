import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "CloudCare API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
