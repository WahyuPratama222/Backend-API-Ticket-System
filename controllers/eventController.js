import asyncHandler from "express-async-handler";
import {
  createEventService,
  getAllEventService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "../services/eventService.js";
import {
  createEventValidation,
  getEventByIdValidation,
  patchEventValidation,
} from "../validations/eventValidation.js";

// ===== Create Event =====
export const createEventController = asyncHandler(async (req, res) => {
  const data = createEventValidation.parse(req.body);
  const organizerId = req.user.id; // dari auth middleware
  const event = await createEventService(organizerId, data);
  res.status(201).json(event);
});

// ===== Get All Events =====
export const getAllEventController = asyncHandler(async (req, res) => {
  const events = await getAllEventService();
  res.json(events);
});

// ===== Get Event By ID =====
export const getEventByIdController = asyncHandler(async (req, res) => {
  const { id } = getEventByIdValidation.parse(req.params);
  const event = await getEventByIdService(id);
  res.json(event);
});

// ===== Update Event =====
export const updateEventController = asyncHandler(async (req, res) => {
  const { id } = getEventByIdValidation.parse(req.params);
  const data = patchEventValidation.parse(req.body);
  const organizerId = req.user.id; // dari auth middleware
  const event = await updateEventService(id, organizerId, data);
  res.json(event);
});

// ===== Soft Delete Event =====
export const deleteEventController = asyncHandler(async (req, res) => {
  const { id } = getEventByIdValidation.parse(req.params);
  const organizerId = req.user.id; // dari auth middleware
  await deleteEventService(id, organizerId);
  res.status(204).send();
});
