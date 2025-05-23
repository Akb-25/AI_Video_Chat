import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import meetingsRoutes from "./routes/meetings.route.js";
import geminiRoutes from "./routes/gemini.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server } from "./lib/socket.js"
import { seedDatabase } from "./seeds/user.seed.js";
dotenv.config();
// const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/meetings", meetingsRoutes);
app.use("/gemini", geminiRoutes);
server.listen(5000, () => {
    console.log("Server is running on port: "+ PORT);
    connectDB();
    // seedDatabase();
})
