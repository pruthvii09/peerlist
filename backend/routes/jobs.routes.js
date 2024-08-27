import express from "express";

import { auth } from "../middleware/auth.js";
import { addJob, getJobs } from "../controllers/jobs.controller.js";

const router = express.Router();

router.post("/", auth, addJob);

router.get("/", getJobs);

export default router;
