import { connectDB } from "./config/mongoConfig.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectFirebase, connectFirestore } from "./config/firebaseConfig.js";
import { corsOptions } from "./config/corsOptions.js";
import postRoutes from "./api/routes/postRoutes.js";
import plantRoutes from "./api/routes/plantRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectFirebase();
connectDB();
export const firestoreDB = connectFirestore();

app.use("/api/posts", postRoutes);
app.use("/api/plants", plantRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
