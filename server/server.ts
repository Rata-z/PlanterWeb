import { connectDB } from "./config/mongoConfig.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Post from "./api/models/Post.js";
import { connectFirebase, listUsers } from "./config/firebaseConfig.js";
import { Auth, getAuth } from "firebase-admin/auth";
import { corsOptions } from "./config/corsOptions.js";
import userRoutes from "./api/routes/userRoutes.js";
import postRoutes from "./api/routes/postRoutes.js";
import middleware from "./api/middleware/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectFirebase();
connectDB();
// listUsers()
//   .then((result) => {
//     console.log(result.users);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
const auth = getAuth();

const insertPostData = () => {
  console.log("Inserted");
  Post.insertMany([
    {
      author: "Me4",
      title: "Test",
      body: "firstTest",
    },
  ]);
};
// insertPostData();
app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

// app.post("/signup", async (req, res) => {
//   const userResponse = await auth.createUser({
//     email: req.body.email,
//     password: req.body.password,
//     emailVerified: false,
//     disabled: false,
//   });
//   res.send(userResponse);
// });

// Usually, you would handle authentication client-side and send a token to the backend.

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
