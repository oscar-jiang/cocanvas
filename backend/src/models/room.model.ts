import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  createdBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 150,
  },
  collaborators:[{
    type: String,
  }],
  maxDocuments: {
    type: Number,
    default: 3,
    required: true,
  }
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;