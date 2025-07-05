import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    default: () => crypto.randomUUID(),
    unique: true,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    maxLength: 255,
  },
  collaborators:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
  }],
  maxDocuments: {
    type: Number,
    default: 3,
    required: true,
  }
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;