import { Request, Response } from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Room from "../models/room.model.js";
import { io } from '../lib/socket.js';


export const getMessages = async (req: Request, res: Response): Promise<any> => {
	try {
		//use params for dynamic id
		const { roomId: roomId } = req.params
		const currentUserId = (req as any).user.userId;

		// Find messages for the room and sort then base on creation time (ascending order)
		const messages = await Message.find({ roomId: roomId })
			.sort({ createdAt: 1 });

		// Extract all unique sender UUIDs
		const senderUUIDs = [...new Set(messages.map(msg => msg.senderId))];

		// Fetch corresponding user info
		const users = await User.find({ userId: { $in: senderUUIDs } }).select("-_id -password");

		// Attach user info manually to each message
		const enrichedMessages = messages.map(msg => {
			const sender = users.find(u => u.userId === msg.senderId);
			return {
				...msg.toObject(),
				sender: sender || null,
			};
		});
		// Send messages back to request
		res.status(200).json(enrichedMessages);
	} catch (error) {
		console.error("Error in getUsersFromSideBar", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
	try {
		const { text } = (req as any).body;
		const roomId = (req as any).room.roomId;
		const senderId = (req as any).user.userId;
		const senderUsername = (req as any).user.username;
		const senderEmail = (req as any).user.email;
		const senderFullName = (req as any).user.fullName;

		let imageURL;
		// TODO: upload image to storage

		// there must be a text message
		if (!text) {
			return res.status(400).json({ error: "Message must have text." })
		}

		// Creating a new message
		const newMessage = new Message({
			roomId: roomId,
			senderId: senderId,
			text: text,
			seenBy: [senderId],
		});

		// Saving the message in the database
		const savedMessage = await newMessage.save();
		// Update the room
		await Room.findOneAndUpdate({roomId: roomId}, {updatedAt: new Date()});

		// Create an enriched message object
		const enrichedMessage = {
			...savedMessage.toObject(),
			sender: {
				username: senderUsername,
				email: senderEmail,
				fullName: senderFullName,
				userId: senderId
			}
		};

		io.in(roomId).emit("newMessage", enrichedMessage);

		res.status(201).json(enrichedMessage);
	} catch (error) {
		console.error("Error in sendMessage", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

// delete Message based on Message Id
export const deleteMessage = async (req: Request, res: Response): Promise<any> => {
	try {
		const { messageId } = (req as any).params;
		if (!messageId) {
			return res.status(400).json({ error: "Message ID is required." });
		}
		Message.findByIdAndDelete(messageId)
	} catch (error) {
		console.error("Error in deleteMessage", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getMessageById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { messageId } = (req as any).params;

		if (!messageId) {
			return res.status(400).json({ error: "Message ID is required." });
		}
		// Find the message by ID
		const message = await Message.find({ messageId: messageId });

		return res.status(200).json(message);

	} catch (error) {
		console.error("Error in getMessageById", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const markMessageSeen = async (req: Request, res: Response): Promise<any> => {
	// TODO
}