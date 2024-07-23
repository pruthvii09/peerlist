import express from "express";

import { auth } from "../middleware/auth.js";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostDetails,
  getPostsByUsername,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostDetails);
router.patch("/", auth, editPost);
router.get("/:username/posts", getPostsByUsername);
router.delete("/:postId", auth, deletePost);
// router.get("/:username", getUserByUsername);
// router.patch("/", auth, primaryDetails);

export default router;
