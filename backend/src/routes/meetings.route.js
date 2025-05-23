import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMeetings, getMeetingInformation } from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getMeetings);
router.get("/info/:id", protectRoute, getMeetingInformation);
// router.get("/meeting/:id", protectRoute, getMeetingInformation);

export default router;