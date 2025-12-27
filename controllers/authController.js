import asyncHandler from "express-async-handler";
import { loginService } from "../services/authService.js";
import { loginValidation } from "../validations/authValidation.js";

// ===== Login =====
export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = loginValidation.parse(req.body);
  const result = await loginService(email, password);
  res.json(result);
});
