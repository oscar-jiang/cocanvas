import { Server } from "socket.io";
import http from "http";
import express from "express";
// import {WebSocketServer} from "ws";
// import { setupWSConnection } from "@y/websocket-server";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  }
});

// listen for the user that has connected
io.on("connection", (socket) => {
  console.log("user connected ", socket.id);

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
    socket.to(message.roomId).emit("message", message);
  });
    
  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
  });
})

// // yjs websocket
// const yjsWebsocket = new WebSocketServer({
//   noServer: true,
// });
//
// // listen for the server so we can connect the yjs server to the existing server
// server.on("upgrade", (request, socket, head) => {
//   if (request.url?.startsWith("/yjs")) {
//     yjsWebsocket.handleUpgrade(request,socket, head, (websocket) => {
//       setupWSConnection(websocket, request);
//     })
//   } else {
//     socket.destroy();
//   }
// });



export { io, app, server }