
import { Request, Response } from "express";
import { Invitation } from "../models/invitation.model.js";
import User from "../models/user.model.js";

export const sendInvite = async (req: Request, res: Response): Promise<any> => {
    try {

        console.log("Request body for sending invite:", req.body);
        const { email, personalMessage, roomId, roomName } = req.body;
        const invitorId = (req as any).user.userId;
        const invitorUsername = (req as any).user.username;

        console.log(email, personalMessage, roomId, roomName, invitorId, invitorUsername);

        // Validate required fields
        if (!invitorId || !invitorUsername || !roomId || !roomName) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const receiver = await User.findOne({ email: email });
        if (!receiver) {
            return res.status(400).json({ error: "Receiver not found" });
        }
        if (receiver.userId === invitorId) {
            return res.status(400).json({ error: "You cannot invite yourself" });
        }

        // Create the invite object
        const invitation = {
            inviteId: crypto.randomUUID(), // Generate a unique invite ID
            invitorId,
            invitorUsername,
            roomId,
            roomName,
            personalMessage: personalMessage || "",
            receiverEmail: email,
            receiverUsername: receiver.username,
            receiverId: receiver.userId
        };

        const newInvite = await Invitation.create(invitation);

        // Respond with the created invite
        res.status(201).json(newInvite);
    } catch (e) {
        console.error("Error in creating invite", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getInbox = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("this got called")
        const { userId: userId } = req.params

        // Fetch the user's inbox
        const user = await User.findOne({ userId });
        console.log("user:" + user)

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const invitations = await Invitation.find({ receiverId: userId });

        console.log("User's inbox:", invitations);

        res.status(200).json(invitations);
    } catch (e) {
        console.error("Error in fetching inbox", e);
        res.status(500).json({ error: "Internal server error" });
    }
}