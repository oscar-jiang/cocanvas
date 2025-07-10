import express from "express"
import { protectRoute } from "../middleware/auth.protectroute.js";
import { getMessages, sendMessage, getMessageById, markMessageSeen, deleteMessage} from "../controllers/message.controller.js"
import {canAccessRoom} from "../middleware/room.canaccessroom.js";

const router = express.Router();

// Is this route still needed?
// router.get("/users", protectRoute, canAccessRoom, getUsersFromSideBar);

// Getting all messages for a room
router.get("/:roomId/getMessages", protectRoute, canAccessRoom , getMessages);

// Getting a specific message
router.get("/message/:messageId", protectRoute, canAccessRoom , getMessageById);

// Sending a message for a room
router.post("/send/:roomId", protectRoute, canAccessRoom, sendMessage);

// Marking a message as seen.
router.put("/seen/:messageId", protectRoute, canAccessRoom, markMessageSeen);

// TODO: Delete (unfinished frontend)
router.delete("/:messageId", protectRoute, canAccessRoom, deleteMessage);

//edit messages in the future?

export default router;
