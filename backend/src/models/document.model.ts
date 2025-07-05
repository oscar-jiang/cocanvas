import mongoose, {Document as MongooseDocument} from "mongoose";

interface CustomDoc extends MongooseDocument {
  docType: "code" | "text";
}

const documentSchema = new mongoose.Schema({
  docId: {
    type: String,
    default: () => crypto.randomUUID(),
    unique: true,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
