import { Request, Response } from "express";
import TemplateRoom from '../models/templateroom.model.js';

export const getAllTemplates = async (req: Request, res: Response):Promise<void> => {
  try {
    // Fetching all Templates from the database
    const allTemplates = await TemplateRoom.find({}).lean();

    res.status(200).json(allTemplates);
  } catch (e) {
    console.error("Error in getAllTemplates", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const createTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomName, description, roomIcon, documents } = req.body;

    const template = new TemplateRoom({
      roomName,
      description,
      roomIcon,
      documents
    });

    await template.save();
    res.status(201).json(template);
  } catch (err) {
    console.error("Error in createTemplate", err);
    res.status(500).json({ error: "Internal server error" });
  }
}