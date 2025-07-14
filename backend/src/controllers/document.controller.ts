// TODO: Write the function defined in google docs
import { Request, Response } from "express";
import Document from "../models/document.model.js";

export const createDoc = async (req: Request, res: Response): Promise<any> => {
    try {
        const { docName, docType, roomId } = (req as any).body;
        const { userId } = (req as any).user;
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

        const newDocument = await Document.create(document);
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
        const exisitingDoc = await Document.findOne({ docId: docId });
        if (!exisitingDoc) {
            return res.status(400).json({ error: "docId doesn't exist in database" });
        }
        console.log(exisitingDoc)
        const updatedDoc = await Document.findOneAndUpdate({ docId: docId }, { lastModifiedBy: userId, content });

        res.status(201).json(updatedDoc);
    } catch (e) {
        console.error("Error in saving doc", e);
        res.status(500).json({ error: "Error in saving doc" });
    }
}

export const getDoc = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("this got called");
        const { docId } = req.params;
        console.log(docId);
        const exisitingDoc  = await Document.findOne({docId : docId});
        if (!exisitingDoc) {
            return res.status(400).json({ error: "docId doesn't exist in database" });
        }
        res.status(200).json(exisitingDoc);
    } catch (e) {
        console.error("Error in fetching inbox", e);
        res.status(500).json({ error: "Internal server error" });
    }
}
