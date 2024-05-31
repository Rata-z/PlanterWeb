import { connectDB } from "./db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors({
    origin: "http://localhost:3000",
}));
app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World!" });
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map