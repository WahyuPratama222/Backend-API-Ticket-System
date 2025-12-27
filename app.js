import express from "express";
import cors from "cors";
import authRoutes from "./routers/authRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import eventRoutes from "./routers/eventRoutes.js";
import bookingRoutes from "./routers/bookingRoutes.js";
import ticketRoutes from "./routers/ticketRoutes.js"; // tambah ini
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

// ===== Routes =====
app.use("/login", authRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);
app.use("/tickets", ticketRoutes);

// ===== Error Handler =====
app.use(errorHandler);

export default app;
