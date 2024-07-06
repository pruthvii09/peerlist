import express from "express";

import { auth } from "../middleware/auth.js";
import {
  addProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/", auth, addProject);
router.get("/", auth, getProjects);
router.get("/:id", getProjectById);
router.patch("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);
// router.patch("/", auth, );

export default router;
