import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const messageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      unique: true,
      required: true,
      default: () => uuidv4(),
    },
    roomId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      maxlength: 1500,
    },
    image: {
      type: String
    },
    seenBy: [{
      type: String,
    }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;