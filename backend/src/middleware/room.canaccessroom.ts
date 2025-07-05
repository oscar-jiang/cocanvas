import Room from "../models/room.model";
import { Request, Response, NextFunction } from "express";

export const canAccessRoom = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = (req as any).user._id;
    const { roomId } = req.params; // extracting the roomId from the URL to perform the check /room/:roomId
    if (!userId) {
      return res.status(400).json({message: "User not found"});
    }
    if (!roomId) {
      return res.status(400).json({message: "Room not found"});
    }

    // Checking to see if the room exists first
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(400).json({message: "Room not found"});
    }

    // Checking to see if the user is added to the room collaborators
    const isAuthorized = room.createdBy.equals(userId) || room.collaborators.some((currId) => currId.equals(userId));

    if (!isAuthorized) {
      return res.status(401).json({message: "Unauthorized - Not a Collaborator"});
    }

    // Add room for the request
    (req as any).room = room;

    // next function
    next();
  } catch (e) {
    console.log("Error in room access: ", e);
    res.status(500).json({message: "Internal Server Error"});
  }
}