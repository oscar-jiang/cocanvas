import { Request, Response } from "express";
import Room from "../models/room.model.js";

export const middle

export const createRoom = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { roomName, description } = req.body;

    // Checking to see if the room has a name
    if (!roomName || roomName.trim() === "") {
      res.status(400).json({ error: "Room name is required" });
    }

    // Creating the new room
    const newRoom = new Room({
      roomName: roomName,
      createdBy: userId,
      description: description,
      collaborators: [userId],
      documents: [],
      maxDocuments: 3,
    });
    await newRoom.save();

    // Generating default documents for the room
    // TODO: write code in the document controller to generate documents for the room

    res.status(200).json(newRoom);
  } catch (e) {
    console.error("Error in creating a new room", error);
    res.status(500).json({ error: "Internal server error" });
  }
};