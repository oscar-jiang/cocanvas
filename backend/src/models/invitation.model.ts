
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const inviteSchema = new mongoose.Schema(
  {
    inviteId: {
      type: String,
      default: () => uuidv4(),
      unique: false, //for now
      required: true,
    },
    invitorId: {
      type: String,
      required: true,
    },
    invitorUsername: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    personalMessage: {
      type: String,
      maxlength: 200,
    },
    receiverEmail: {
      type: String,
      required: true,
    },
    receiverUsername: {
      type: String,
    },
    receiverId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Invitation = mongoose.model("Invitation", inviteSchema);