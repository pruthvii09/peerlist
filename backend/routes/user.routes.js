import express from "express";
import {
  getUserByUsername,
  login,
  primaryDetails,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/:username", getUserByUsername);
router.patch("/", auth, primaryDetails);

export default router;