import mongoose, {Document as MongooseDocument} from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface CustomDoc extends MongooseDocument {
  docType: "code" | "text";
}

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
    type: String,
    required: true,
    default: function(this: CustomDoc) {
      switch (this.docType) {
        case "code":
          return {code: "", codeLanguage: "javascript"};
        case "text":
          return {text: "", textFormatting: {}};
        default:
          return {};
      }
    }
  },
  version: {
    type: Number,
    default: 1,
    required: true,
  }
}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);
export default Document;
