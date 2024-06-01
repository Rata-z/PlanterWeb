import { connectDB } from "./db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Post from "./models/Post.js";
import { connectFirebase, listUsers } from "./firebase.js";
import { Auth, getAuth } from "firebase-admin/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
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

app.post("/signup", async (req, res) => {
  const userResponse = await auth.createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  });
  res.send(userResponse);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
