import express from "express";
import {
  getAllTicketController,
  getTicketByIdController,
  markTicketUsedController,
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", getAllTicketController);
router.get("/:id", getTicketByIdController);
router.patch("/used/:id", markTicketUsedController);

export default router;
