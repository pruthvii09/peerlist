import express from "express";

import { auth } from "../middleware/auth.js";
import {
  createPost,
  getAllPosts,
  getPostDetails,
  getPostsByUsername,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostDetails);
router.get("/:username/posts", getPostsByUsername);
// router.get("/:username", getUserByUsername);
// router.patch("/", auth, primaryDetails);

export default router;
