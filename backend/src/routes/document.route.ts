import express from "express"
import { protectRoute } from "../middleware/auth.protectroute.js";
import { saveDoc, getDoc, createDoc, getAllDocs } from "../controllers/document.controller.js";
import {canAccessRoom} from "../middleware/room.canaccessroom.js";

const router = express.Router();


router.post("/:roomId/createDoc", protectRoute, canAccessRoom, createDoc);
router.post("/:roomId/saveDoc", protectRoute, canAccessRoom, saveDoc);
router.get("/:roomId/getDoc/:docId", protectRoute, canAccessRoom, getDoc);
router.get("/:roomId/getAllDocs", protectRoute, canAccessRoom, getAllDocs);


export default router;