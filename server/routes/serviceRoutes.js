import { Router } from "express";
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = Router();

router.get("/", getServices);
router.get("/:slug", getService);

router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
