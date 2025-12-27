import asyncHandler from "express-async-handler";
import {
  createUserService,
  getAllUserService,
  getUserByIdService,
  patchUserService,
  deleteUserService,
} from "../services/userService.js";
import {
  createUserValidation,
  getUserByIdValidation,
  patchUserValidation,
} from "../validations/userValidation.js";

// ===== Create User =====
export const createUserController = asyncHandler(async (req, res) => {
  const data = createUserValidation.parse(req.body);
  const user = await createUserService(data);
  res.status(201).json(user);
});

// ===== Get All Users =====
export const getAllUserController = asyncHandler(async (req, res) => {
  const users = await getAllUserService();
  res.json(users);
});

// ===== Get User By ID =====
export const getUserByIdController = asyncHandler(async (req, res) => {
  const { id } = getUserByIdValidation.parse(req.params);
  const user = await getUserByIdService(id);
  res.json(user);
});

// ===== Patch User =====
export const patchUserController = asyncHandler(async (req, res) => {
  const { id } = getUserByIdValidation.parse(req.params);
  const data = patchUserValidation.parse(req.body);
  const user = await patchUserService(id, data);
  res.json(user);
});

// ===== Delete User =====
export const deleteUserController = asyncHandler(async (req, res) => {
  const { id } = getUserByIdValidation.parse(req.params);
  await deleteUserService(id);
  res.status(204).send();
});
