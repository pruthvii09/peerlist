import express from "express";
import {
  addFollower,
  deleteGithub,
  getAccessTokenGithub,
  getAllFollowerFollowing,
  getAllUsers,
  getUserByUsername,
  login,
  primaryDetails,
  removeFollower,
  searchUsersByUsername,
  signup,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/removegithub", auth, deleteGithub);
router.get("/getToken", auth, getAccessTokenGithub);
router.post("/follow/:followerId", auth, addFollower);
router.post("/unfollow/:followerId", auth, removeFollower);
router.get("/", getAllUsers);
router.get("/allfollow/:username", getAllFollowerFollowing);
router.get("/search/", searchUsersByUsername);
router.get("/:username", getUserByUsername);
router.patch("/", auth, primaryDetails);

export default router;
