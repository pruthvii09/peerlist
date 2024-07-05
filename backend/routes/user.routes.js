import express from "express";
import {
  login,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/", auth, updateProfile);

export default router;
