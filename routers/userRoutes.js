import express from "express";
import {
  createUserController,
  getAllUserController,
  getUserByIdController,
  patchUserController,
  deleteUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getAllUserController);
router.get("/:id", getUserByIdController);
router.patch("/:id", patchUserController);
router.delete("/:id", deleteUserController);

export default router;
