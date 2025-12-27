import asyncHandler from "express-async-handler";
import {
  createBookingService,
  getAllBookingService,
  getBookingByIdService,
} from "../services/bookingService.js";
import {
  createBookingValidation,
  getBookingByIdValidation,
} from "../validations/bookingValidation.js";

// ===== Create Booking =====
export const createBookingController = asyncHandler(async (req, res) => {
  const data = createBookingValidation.parse(req.body);
  const customerId = req.user.id;
  const booking = await createBookingService(customerId, data);
  res.status(201).json(booking);
});

// ===== Get All Bookings =====
export const getAllBookingController = asyncHandler(async (req, res) => {
  const bookings = await getAllBookingService();
  res.json(bookings);
});

// ===== Get Booking By ID =====
export const getBookingByIdController = asyncHandler(async (req, res) => {
  const { id } = getBookingByIdValidation.parse(req.params);
  const booking = await getBookingByIdService(id);
  res.json(booking);
});
