import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const templateDocumentSchema = new mongoose.Schema({
  templateDocId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
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
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  documentIcon: {
    type: String,
    default: '📄',
  }
});


const templateRoomSchema = new mongoose.Schema({
  templateRoomId: {
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
  description: {
    type: String,
    maxLength: 150,
  },
  roomIcon: {
    type: String,
    default: '🚀'
  },
  documents: [templateDocumentSchema],
}, { timestamps: true });

const TemplateRoom = mongoose.model("TemplateRoom", templateRoomSchema);
export default TemplateRoom;

// When converting the schema to a relational database
// this will be two tables, TemplateRoom and TemplateDocument, in a one-to-many relationship