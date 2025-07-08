import { Request, Response } from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

// this function can be handled by the room controller
export const getUsersFromSideBar = async (req: Request, res: Response): Promise<any> => {
	try {
		const loggedInUserId = (req as any).user._id;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersFromSideBar", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req: Request, res: Response): Promise<any> => {
	try {
		//use params for dynamic id
		const { roomId: roomId } = req.params
		const currentUserId = (req as any).user._id;

		// Find messages for the room and sort then base on creation time (ascending order)
		const messages = await Message.find({roomId: roomId})
			.sort({ createdAt: 1 })
			.populate("senderId", "fullName email");

		// Send messages back to request
		res.status(200).json(messages)
	} catch (error) {
		console.error("Error in getUsersFromSideBar", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
	try {
		const { text } = (req as any).body;
		const roomId = (req as any).room.roomId;
		const senderId = (req as any).user._id;

		let imageURL;
		// TODO: upload image to storage

		// there must be a text message
		if (!text) {
			return res.status(400).json({ error: "Message must have text."})
		}

		// Creating a new message
		const newMessage = new Message({
			roomId: roomId,
			senderId: senderId,
			text: text,
			seenBy: [senderId],
		});

		// Saving the message in the database
		await newMessage.save();

		// TODO:  socket.io for all users in the room

		res.status(201).json(newMessage);
	} catch (error) {
		console.error("Error in sendMessage", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getMessageById = async (req: Request, res: Response): Promise<any> => {
	// TODO
}

export const markMessageSeen = async (req: Request, res: Response): Promise<any> => {
	// TODO
}