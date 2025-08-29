export interface Room {
  _id: string; // MongoDB ObjectId as string
  roomId: string;
  roomName: string;
  createdBy: string; // user ObjectId
  description?: string;
  collaborators: string[]; // user ObjectIds
  maxDocuments: number;
  createdAt: string;
  updatedAt: string;
  createdByUsername?: string;
  roomIcon?: string;
}
