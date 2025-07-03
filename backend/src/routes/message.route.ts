import express from "express"
import { protectRoute } from "../middleware/auth.protectroute.js";
import { getUsersFromSideBar, getMessages, sendMessage} from "../controllers/message.controller.js"

const router = express.Router();


router.get("/users", protectRoute, getUsersFromSideBar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage)


export default router;
