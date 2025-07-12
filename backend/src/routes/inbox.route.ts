import express from "express"
import { protectRoute } from "../middleware/auth.protectroute.js";
import { sendInvite, getInbox, acceptInvitation, declineInvitation } from "../controllers/inbox.controller.js";

const router = express.Router();

// Route to create an invitation
router.post("/sendInvite", protectRoute, sendInvite);

router.get("/getInbox/:userId", protectRoute, getInbox);

router.post("/acceptInvitation/:inviteId", protectRoute, acceptInvitation);
router.post("/declineInvitation/:inviteId", protectRoute, declineInvitation);

//TODO: add middleware to make sure user is the same as the userId in the params

export default router;