import asyncHandler from "express-async-handler";
import {
  getAllTicketService,
  getTicketByIdService,
  markTicketUsedService,
} from "../services/ticketService.js";
import {
  getTicketByIdValidation,
  markTicketUsedValidation,
} from "../validations/ticketValidation.js";

// ===== Get All Tickets =====
export const getAllTicketController = asyncHandler(async (req, res) => {
  const tickets = await getAllTicketService();
  res.json(tickets);
});

// ===== Get Ticket By ID =====
export const getTicketByIdController = asyncHandler(async (req, res) => {
  const { id } = getTicketByIdValidation.parse(req.params);
  const ticket = await getTicketByIdService(id);
  res.json(ticket);
});

// ===== Mark Ticket Used =====
export const markTicketUsedController = asyncHandler(async (req, res) => {
  const { id } = markTicketUsedValidation.parse(req.params);
  const ticket = await markTicketUsedService(id);
  res.json(ticket);
});
