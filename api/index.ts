/** @format */

import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import companies from "./routes/companies";
import categories from "./routes/categories";
import users from "./routes/users";


import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleWare";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // ✅ body parser
app.use(cookieParser()); // ✅ cookie parser buraya

// Route bağlama

app.use("/auth", auth);
app.use("/companies",authMiddleware, companies);
app.use("/categories",authMiddleware, categories);
app.use("/users",authMiddleware, users);




app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
