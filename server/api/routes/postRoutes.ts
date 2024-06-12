import express from "express";
import path from "path";
import { addPost, getPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts).post(addPost);
router.route("/:id").get(getPost);

export default router;
