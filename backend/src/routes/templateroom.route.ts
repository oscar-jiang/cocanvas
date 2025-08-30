import express from "express";
import { protectRoute } from "../middleware/auth.protectroute.js";
import {
  getAllTemplates,
  createTemplate,
} from "../controllers/templateroom.controller.js"

const router = express.Router();

// get all templates
router.get('/all', protectRoute, getAllTemplates);

router.post('/create', protectRoute, createTemplate);

export default router;