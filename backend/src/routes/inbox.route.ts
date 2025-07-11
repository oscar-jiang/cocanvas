import express from "express"
import { protectRoute } from "../middleware/auth.protectroute.js";
import { sendInvite, getInbox } from "../controllers/inbox.controller.js";

const router = express.Router();

// Route to create an invitation
router.post("/sendInvite", protectRoute, sendInvite);

router.get("/getInbox", protectRoute, getInbox);


export default router;