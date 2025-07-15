import express from "express"
import { protectRoute } from "../middleware/auth.protectroute.js";
import { saveDoc, getDoc, createDoc, getAllDocs } from "../controllers/document.controller.js";
import {canAccessRoom} from "../middleware/room.canaccessroom";

const router = express.Router();


router.post("/createDoc", protectRoute, canAccessRoom, createDoc);
router.post("/saveDoc", protectRoute, canAccessRoom, saveDoc);
router.get("/getDoc/:docId", protectRoute, canAccessRoom, getDoc);
router.get("/getAllDocs", protectRoute, canAccessRoom, getAllDocs);


export default router;