import express from "express";
import middleware from "../middleware/index.js";
import { getUserPlants } from "../controllers/plantController.js";

const router = express.Router();
const auth = middleware.decodeToken;

router.route("/").get(auth, getUserPlants);
export default router;
