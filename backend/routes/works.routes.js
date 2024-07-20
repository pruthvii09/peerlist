import express from "express";

import { auth } from "../middleware/auth.js";
import {
  addWork,
  getUserWorkExperienceByUsername,
} from "../controllers/work.controller.js";

const router = express.Router();

router.post("/", auth, addWork);
router.get("/:username", getUserWorkExperienceByUsername);
// router.get("/:id", getProjectById);
// router.patch("/:id", auth, updateProject);
// router.delete("/:id", auth, deleteProject);
// router.patch("/", auth, );

export default router;
