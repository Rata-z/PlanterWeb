import express from "express";
import { addPost, getPost, getPosts, editPost, addComment, editComment, deleteComment, deletePost, togglePostLike, } from "../controllers/postController.js";
import middleware from "../middleware/index.js";
import { addCommentLimiter, addPostLimiter, deleteCommentLimiter, deletePostLimiter, editCommentLimiter, editPostLimiter, getPostLimiter, getPostsLimiter, likeLimiter, } from "../middleware/limiters.js";
const router = express.Router();
const auth = middleware.decodeToken;
router
    .route("/")
    .get(getPostsLimiter, getPosts)
    .post(auth, addPostLimiter, addPost);
router
    .route("/:id")
    .get(getPostLimiter, getPost)
    .put(auth, editPostLimiter, editPost)
    .delete(auth, deletePostLimiter, deletePost);
router.route("/:id/comments").post(auth, addCommentLimiter, addComment);
router.route("/:id/likes").put(auth, likeLimiter, togglePostLike);
router
    .route("/:id/:commentID")
    .put(auth, editCommentLimiter, editComment)
    .delete(auth, deleteCommentLimiter, deleteComment);
export default router;
//# sourceMappingURL=postRoutes.js.map