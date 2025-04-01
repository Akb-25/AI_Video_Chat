import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
    console.log("Server is running on port: "+ PORT);
    connectDB();
})
