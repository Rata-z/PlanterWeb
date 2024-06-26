import { connectDB } from "./config/mongoConfig.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Post from "./api/models/Post.js";
import {
  connectFirebase,
  connectFirestore,
  listUsers,
} from "./config/firebaseConfig.js";
import { Auth, getAuth } from "firebase-admin/auth";
import { corsOptions } from "./config/corsOptions.js";
import userRoutes from "./api/routes/userRoutes.js";
import postRoutes from "./api/routes/postRoutes.js";
import middleware from "./api/middleware/index.js";
import plantRoutes from "./api/routes/plantRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectFirebase();
connectDB();
const auth = getAuth();
export const firestoreDB = connectFirestore();

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/plants", plantRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
