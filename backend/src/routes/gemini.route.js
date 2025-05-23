import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { uploadConversation } from '../controllers/gemini.controllers.js';

const router = express.Router();

router.post("/upload-conversation", uploadConversation);

export default router;