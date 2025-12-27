import express from "express";
import {
  createEventController,
  getAllEventController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
} from "../controllers/eventController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ===== Event =====
// Semua route create/update/delete hanya untuk organizer
router.post("/", protect, authorize("organizer"), createEventController);
router.get("/", getAllEventController);
router.get("/:id", getEventByIdController);
router.patch("/:id", protect, authorize("organizer"), updateEventController);
router.delete("/:id", protect, authorize("organizer"), deleteEventController);

export default router;
