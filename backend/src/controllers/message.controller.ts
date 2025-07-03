import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";

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
		const { id: userToChatId } = req.params
		const currentUserId = (req as any).user._id;
		//find all the msg where current user is the sender & the receiver is the other person, visa versa
		const messages = await Message.find({
			$or: [
				{ senderId: currentUserId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: currentUserId }
			]
		})

		res.status(200).json(messages)
	} catch (error) {
		console.error("Error in getUsersFromSideBar", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
	try {
		const { text, image } = (req as any).body;
		const { id: receiverId } = req.params;
		const senderId = (req as any).user._id;

		let imageURL;
		// TODO: upload image to storage

		const newMessage = new Message({
			sendId: senderId,
			receiverId: receiverId,
			text: text,
			image: imageURL
		})

		await newMessage.save();

		// TODO:  socket.io  

		res.status(201).json(newMessage);

	} catch (error) {
		console.error("Error in getUsersFromSideBar", error);
		res.status(500).json({ error: "Internal server error" });
	}
}