import express from "express"
import { protectRoute } from "../middleware/auth.protectroute.js";
import { saveDoc, getDoc, createDoc } from "../controllers/document.controller.js";

const router = express.Router();


router.post("/createDoc", protectRoute, createDoc);
router.post("/saveDoc", protectRoute, saveDoc);
router.get("/getDoc/:docId", protectRoute, getDoc);


export default router;