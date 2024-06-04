import express from "express";
import path from "path";
import { userSignIn, userSignUp } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(userSignUp).get(userSignIn);

export default router;
