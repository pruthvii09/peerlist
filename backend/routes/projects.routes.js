import express from "express";

import { auth } from "../middleware/auth.js";
import { addProject, getProjects } from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/", auth, addProject);
router.get("/", auth, getProjects);
// router.patch("/", auth, );

export default router;
