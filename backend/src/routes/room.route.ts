import express from "express";
import { protectRoute } from "../middleware/auth.protectroute.js";
import {
  addCollaborator,
  createRoom,
  deleteRoom,
  getMyRooms,
  getRoomById, removeCollaborator,
  updateRoom,
  getCollaborators
} from "../controllers/room.controller.js";
import {canAccessRoom} from "../middleware/room.canaccessroom.js";
import {isRoomOwner} from "../middleware/room.isroomowner.js";

const router = express.Router();

// Create a new room
router.post("/create", protectRoute, createRoom);

// Get all rooms a user is in
router.get("/user/my", protectRoute, getMyRooms);

// Get room by id
router.get("/:roomId", protectRoute, canAccessRoom, getRoomById);

// Update room; updating room name or description
router.put("/:roomId", protectRoute, canAccessRoom, isRoomOwner, updateRoom);

// delete room
router.delete("/:roomId", protectRoute, isRoomOwner, deleteRoom);

// add a collaborator
router.post("/:roomId/collaborators", protectRoute, canAccessRoom, addCollaborator);

// remove a collaborator
router.delete("/:roomId/collaborators/:userId", protectRoute, canAccessRoom, removeCollaborator);

// getting all collaborators
router.get("/:roomId/collaborators", protectRoute, canAccessRoom, getCollaborators);

export default router;