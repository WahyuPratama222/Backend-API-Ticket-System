import express from "express";
import {
  createBookingController,
  getAllBookingController,
  getBookingByIdController,
} from "../controllers/bookingController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ===== Booking =====
// Semua route booking butuh customer login
router.post("/", protect, createBookingController);
router.get("/", protect, getAllBookingController);
router.get("/:id", protect, getBookingByIdController);

export default router;
