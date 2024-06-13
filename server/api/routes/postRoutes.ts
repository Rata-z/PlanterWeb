import express from "express";
import path from "path";
import {
  addPost,
  getPost,
  getPosts,
  editPost,
  addComment,
  editComment,
  deleteComment,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts).post(addPost);
router.route("/:id").get(getPost).put(editPost).delete(deletePost);
router.route("/:id/").post(addComment);
router.route("/:id/:commentID").put(editComment).delete(deleteComment);

export default router;
