import { Request, Response } from "express";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Document from "../models/document.model.js";

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.userId;
    const { roomName, description, roomIcon } = req.body;

    // Checking to see if the room has a name
    if (!roomName || roomName.trim() === "") {
      return res.status(400).json({ error: "Room name is required" });
    }

    // Check to see the name is <= 100 characters and description is <= 150 characters long
    const nameLength: number = roomName.length;
    const descriptionLength: number = description.length;
    if (nameLength > 100 || descriptionLength > 150) {
      return res.status(400).json({ error: "Room name and/or description is too long" });
    }

    // Count how many rooms the user has already created
    const userRoomCount: number = await Room.countDocuments({ createdBy: userId });
    if (userRoomCount >= 10) {
      return res.status(403).json({ error: "Room limit reached (10 rooms max)" });
    }

    // Creating the new room
    const newRoom = new Room({
      roomName: roomName,
      createdBy: userId,
      description: description,
      collaborators: [userId],
      documents: [],
      maxDocuments: 3,
      roomIcon: roomIcon || "🚀",
    });
    await newRoom.save();

    // Generating default documents for the room
    // TODO: write code in the document controller to generate documents for the room

    res.status(201).json(newRoom);
  } catch (e) {
    console.error("Error in creating a new room", e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.userId;
    const room = (req as any).room;

    // Since our middleware handles the these do we still need the check?
    // Check to see if the user is the owner of the
    const isRoomCreator = room.createdBy === userId;
    if (!isRoomCreator) {
      return res.status(403).json({ message: "You can only delete rooms you created" });
    }

    // Deleting room from the database
    await Room.findOneAndDelete({ roomId: room.roomId });

    //delete Messages associated with the room
    await Message.deleteMany({ roomId: room.roomId });

    //delete the documents associated with the room as well
    await Document.deleteMany({ roomId: room.roomId });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (e) {
    console.log("Error in room deletion: ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getMyRooms = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.userId;

    // Find all rooms that the user is the creator & collaborator in
    const rooms = await Room.find({
      $or: [
        { createdBy: userId },
        { collaborators: { $in: [userId] } },
      ]
    }).sort({ updatedAt: -1 })
      .lean();

    // Collect unique createdBy IDs
    const userIds = Array.from(new Set(rooms.map(room => room.createdBy.toString())));

    // Fetch usernames in one query
    const users = await User.find(
      { userId: { $in: userIds } },
      { username: 1, userId: 1 }
    ).lean();

    // Map userId -> username
    const userMap = new Map(users.map(user => [user.userId, user.username]));

    // Attach username to each room
    const roomsWithUsername = rooms.map(room => ({
      ...room,
      createdByUsername: userMap.get(room.createdBy.toString()) || "Unknown",
    }));

    res.status(200).json(roomsWithUsername);
  } catch (e) {
    console.error("Error in getting User's rooms", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getRoomById = async (req: Request, res: Response): Promise<any> => {
  try {
    // room is attached from the request in middleware
    const room = (req as any).room;

    res.status(200).json(room);
  } catch (e) {
    console.error("Error in getting getting a specific rom", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const updateRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const room = (req as any).room;
    const { roomName, description } = req.body;

    // Checking to see if the roomName is valid
    if (!roomName || roomName.trim() === "") {
      return res.status(400).json({ error: "Room name is required" });
    }

    // Reassigning the roomName and description
    room.roomName = roomName;
    room.description = description;

    // Saving the new changes
    const newRoom = await room.save();

    res.status(200).json(newRoom);
  } catch (e) {
    console.error("Error in updating room", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const addCollaborator = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.userId;
    const room = (req as any).room;
    const { collaboratorEmail } = req.body;

    // Checking to see if there is a collaborator given
    if (!collaboratorEmail || collaboratorEmail.trim() === "") {
      return res.status(400).json({ error: "Collaborator email is required" });
    }

    // Checking to see if the email exists in the database
    const userToBeAdded = await User.findOne({ email: collaboratorEmail });
    if (!userToBeAdded) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const userToBeAddedId = userToBeAdded.userId;

    // Checking if the user to be added is the creator of the room
    if (room.createdBy === userToBeAddedId || room.collaborators.includes(userToBeAddedId)) {
      return res.status(400).json({ error: "User is already a collaborator or the owner" });
    }

    // Adding the user to the room
    room.collaborators.push(userToBeAddedId);
    await room.save();

    // Returning the newly updated room
    const updatedRoom = await Room.findOne({ roomId: room.roomId });

    res.status(200).json(updatedRoom);
  } catch (e) {
    console.error("Error in adding user to room", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const removeCollaborator = async (req: Request, res: Response): Promise<any> => {
  try {
    const room = (req as any).room;
    const { roomId, userId } = req.params;
    console.log("Removing collaborator from room: ", roomId, " for user: ", userId);
    // remove the user from the room's collaborators
    await Room.findOneAndUpdate(
      { roomId: roomId },
      { collaborators: room.collaborators.filter((collaboratorId: string) => collaboratorId !== userId) }, { new: true });
    res.status(200).json({ message: "Deleted successfully", room });
  } catch (e) {
    console.error("Error in removing collaborator", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getCollaborators = async (req: Request, res: Response): Promise<any> => {
  try {
    const room = (req as any).room;

    // All the user ids
    const collaboratorIds = room.collaborators;

    // Getting the user information in the db
    const users = await User.find({ userId: { $in: collaboratorIds } }).select("-password");

    res.status(200).json(users);
  } catch (e) {
    console.error("Error in getting all collaborators", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getMyRoomsRecent = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.userId;

    // Getting all the rooms that are the most recent
    const recentRooms = await Room.find({
      $or: [
        { createdBy: userId },
        { collaborators: { $in: [userId] } },
      ]
    })
      .sort({ updatedAt: -1 })
      .limit(6)
      .lean();

    // Collect all unique userIds from createdBy
    const userIds = Array.from(
      new Set(recentRooms.map(room => room.createdBy.toString()))
    );

    // Fetch usernames in one query
    const users = await User.find({ userId: { $in: userIds } }, { username: 1, userId: 1 }).lean();

    // Map userId -> username
    const userMap = new Map(users.map(user => [user.userId, user.username]));

    // Attach username to each room
    const roomsWithUsername = recentRooms.map(room => ({
      ...room,
      createdByUsername: userMap.get(room.createdBy.toString()) || "Unknown",
    }));

    // Return as a response to user
    res.status(200).json(roomsWithUsername);
  } catch (e) {
    console.error("Error in getting recent rooms", e);
    res.status(500).json({ error: "Internal server error" });
  }
}
