import express from "express";
import middleware from "../middleware/index.js";
import { getUserPlants } from "../controllers/plantController.js";
import { getPlantsLimiter } from "../middleware/limiters.js";
const router = express.Router();
const auth = middleware.decodeToken;
router.route("/").get(auth, getPlantsLimiter, getUserPlants);
export default router;
//# sourceMappingURL=plantRoutes.js.map