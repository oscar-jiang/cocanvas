import { Request, Response } from "express";
import { Invitation } from "../models/invitation.model.js";
import User from "../models/user.model.js";
import Room from "../models/room.model.js";
import { getSocketIdByUserId, io } from '../lib/socket.js';

export const sendInvite = async (req: Request, res: Response): Promise<any> => {
	try {
		const { receiverEmail, personalMessage, roomId, roomName } = req.body;
		const invitorId = (req as any).user.userId;
		const invitorUsername = (req as any).user.username;
		const invitorEmail = (req as any).user.email;

		// Validate required fields
		if (!invitorId || !invitorUsername || !roomId || !roomName) {
			return res.status(400).json({ error: "All fields are required." });
		}

		// find the room
		const room = await Room.findOne({ roomId: roomId });

		if (!room) {
			return res.status(400).json({ error: "Room not found." });
		}
		const allCollabs = room.collaborators;


		//find the receiver by email
		const receiver = await User.findOne({ email: receiverEmail });
		if (!receiver) {
			return res.status(400).json({ error: "Receiver not found." });
		}
		if (receiver.userId === invitorId) {
			return res.status(400).json({ error: "You cannot invite yourself!" });
		}

		// check to see if receiver is already in room
		const isReceiverInRoom = allCollabs.find((collabID) => collabID === receiver.userId);
		if (isReceiverInRoom) {
			return res.status(400).json({ error: "This User is already in the room!" });
		}

		// Create the invite object
		const invitation = {
			inviteId: crypto.randomUUID(), // Generate a unique invite ID
			invitorId,
			invitorUsername,
			invitorEmail,
			roomId,
			roomName,
			personalMessage: personalMessage || "",
			receiverEmail,
			receiverUsername: receiver.username,
			receiverId: receiver.userId
		};

		const newInvite = await Invitation.create(invitation);

		const receiverSocketId = getSocketIdByUserId(receiver.userId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("incomingInvite", newInvite);
		}

		// Respond with the created invite
		res.status(201).json(newInvite);
	} catch (e) {
		console.error("Error in creating invite", e);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getInbox = async (req: Request, res: Response): Promise<any> => {
	try {
		const { userId: userId } = req.params
		// Fetch the user's inbox
		const user = await User.findOne({ userId });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		const invitations = await Invitation.find({ receiverId: userId });
		res.status(200).json(invitations);
	} catch (e) {
		console.error("Error in fetching inbox", e);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const acceptInvitation = async (req: Request, res: Response): Promise<any> => {
	try {
		const { inviteId } = req.params;
		const userId = (req as any).user.userId;

		// Find the invitation
		const invitation = await Invitation.findOne({ inviteId, receiverId: userId });
		if (!invitation) {
			return res.status(400).json({ error: "Invitation not found" });
		}
		// Check if the user is already a member of the room
		const room = await Room.findOne({ roomId: invitation.roomId });
		if (room?.collaborators.includes(userId)) {
			return res.status(400).json({ error: "You're already in this room!" });
		}
		// Add the user to the room's collaborators
		await Room.findOneAndUpdate(
			{ roomId: invitation.roomId },
			{ $addToSet: { collaborators: userId } },
			{ new: true }
		);

		// Remove the invitation from the database
		await Invitation.findOneAndDelete({ inviteId, receiverId: userId });
		res.status(200).json({message : "Invitation accepted successfully"});

	} catch (e) {
		console.error("Error in accepting invitation", e);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const declineInvitation = async (req: Request, res: Response): Promise<any> => {
	try {
		console.log("Declining invitation");
		const { inviteId } = req.params;
		const userId = (req as any).user.userId;

		// Find the invitation
		await Invitation.findOneAndDelete({ inviteId, receiverId: userId });

		res.status(200).json({message : "Invitation declined successfully"});
	} catch (e) {
		console.error("Error in decling invitation", e);
		res.status(500).json({ error: "Internal server error" });
	}
}