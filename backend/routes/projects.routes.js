import express from "express";

import { auth } from "../middleware/auth.js";
import {
  addProject,
  deleteProject,
  getProjectById,
  getProjects,
  removeImage,
  updateProject,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/", auth, addProject);
router.get("/", auth, getProjects);
router.post("/remove-image", removeImage);
router.get("/:id", getProjectById);
router.patch("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);
// router.patch("/", auth, );

export default router;
