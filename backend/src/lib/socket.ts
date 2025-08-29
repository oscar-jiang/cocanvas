import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  }
});

// Map to track online users
const onlineUsers = new Map<string, string>(); // userId -> socketId

// listen for the user that has connected
io.on("connection", (socket) => {
  // Register userId with this socket
  socket.on("registerUser", (userId: string) => {
    onlineUsers.set(userId, socket.id);
    console.log("Registered user:", userId, "with socket:", socket.id);
  });

  socket.on("leaveRoom", (roomId: string) => {
    // console.log(`user ${socket.id} disconnected `, socket.id);
    socket.leave(roomId);
  })

  socket.on("joinRoom", (roomId: string) => {
    // console.log(`user ${socket.id} joined room`, roomId);
    socket.join(roomId);
  });

  //message event
  socket.on("sendMessage", (message) => {
    // broadcast the message to all users in the room
    socket.in(message.roomId).emit("newMessage", message);
  });
    
  socket.on("disconnect", () => {
    for (const [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) {
        onlineUsers.delete(userId);
        console.log("User disconnected:", userId);
        break;
      }
    }
  });
});

export const getSocketIdByUserId = (userId: string) => {
  return onlineUsers.get(userId);
};

export { io, app, server }