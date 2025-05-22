import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage, getUsersForSidebar } from "../controllers/message.controllers.js";
import { getStreamToken } from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectRoute , getUsersForSidebar);
router.get("/token", protectRoute, getStreamToken);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;