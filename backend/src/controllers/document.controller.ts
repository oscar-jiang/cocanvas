import { Request, Response } from "express";
import Document from "../models/document.model.js";

export const createDoc = async (req: Request, res: Response): Promise<any> => {
  try {
    const { docName, docType, roomId } = (req as any).body;
    const { userId } = (req as any).user;

    // count documents
    const room = (req as any).room;
    const count = await Document.countDocuments({ roomId: room.roomId });
    if (count > 8) {
      return res.status(400).json({ error: "Maximum number of documents reached for this room." });
    }

    // create document
    const blankContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [],
        },
      ],
    };
    const document = {
      roomId,
      docName,
      docType,
      createdBy: userId,
      lastModifiedBy: userId,
      content: blankContent
    };

    // save
    const newDocument = await Document.create(document);

    // send to request
    res.status(201).json(newDocument);
  } catch (e) {
    console.error("Error in creating doc", e);
    res.status(500).json({ error: "error in creating doc" });
  }
}

export const saveDoc = async (req: Request, res: Response): Promise<any> => {
  try {
    const { content, docId } = (req as any).body;
    const userId = (req as any).user.userId;

    const existingDoc = await Document.findOne({ docId: docId });
    if (!existingDoc) {
      return res.status(400).json({ error: "docId doesn't exist in database" });
    }

    const updatedDoc = await Document.findOneAndUpdate(
      { docId: docId }, // filter by docId
      { lastModifiedBy: userId, content: content }, // update these fields
      { new: true } // return updated document
    );

    res.status(201).json(updatedDoc);
  } catch (e) {
    console.error("Error in saving doc", e);
    res.status(500).json({ error: "Error in saving doc" });
  }
}

export const getDoc = async (req: Request, res: Response): Promise<any> => {
  try {
    const { docId } = req.params;
    const existingDoc = await Document.findOne({ docId: docId });
    if (!existingDoc) {
      return res.status(400).json({ error: "docId doesn't exist in database" });
    }
    res.status(200).json(existingDoc);
  } catch (e) {
    console.error("Error in fetching doc", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getAllDocs = async (req: Request, res: Response): Promise<any> => {
  try {
    const roomId = (req as any).room.roomId;

    const docs = await Document.find({roomId});

    res.status(200).json(docs);
  } catch (e) {
    console.error("Error in fetching all docs in room", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteDoc = async (req: Request, res: Response): Promise<any> => {
  try {
    const { roomId, docId } = req.params;

    await Document.findOneAndDelete({ docId: docId });

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (e) {
    console.error("Error in deleting the document. ", e);
    res.status(500).json({ error: "Internal server error" });
  }
}
