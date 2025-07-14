import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const documentSchema = new mongoose.Schema({
  docId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  docType: {
    type: String,
    enum: ['code', 'text'],
    required: true,
  },
  docName: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  lastModifiedBy: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);
export default Document;
