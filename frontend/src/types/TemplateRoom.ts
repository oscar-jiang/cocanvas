export interface TemplateRoom {
  _id?: string; // MongoDB ObjectId as string
  templateRoomId?: string;
  roomName?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  roomIcon?: string;
}
