
import express from "express"
import ChatController from "../app/controllers/chat.controller";

const router = express.Router();

router.get("/voices", ChatController.getVoices);
router.post("/chat", ChatController.replyChat);

export default router;