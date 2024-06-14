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
import middleware from "../middleware/index.js";

const router = express.Router();
const auth = middleware.decodeToken;

router.route("/").get(getPosts).post(auth, addPost);
router.route("/:id").get(getPost).put(auth, editPost).delete(auth, deletePost);
router.route("/:id/").post(auth, addComment);
router
  .route("/:id/:commentID")
  .put(auth, editComment)
  .delete(auth, deleteComment);

export default router;
