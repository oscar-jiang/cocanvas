import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import roomRoutes from "./routes/room.route.js"
import inboxRoutes from "./routes/inbox.route.js"
import docRoutes from "./routes/document.route.js"
import {connectDB} from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js"

dotenv.config();
// const app = express(); // when creating the socket.io we will remove this and use the one in lin

const PORT = process.env.PORT || 3000;

// extract json data from the request body
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5173", // frontend url when we decide to deploy it
    credentials: true,
  }
));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/inbox", inboxRoutes)
app.use("/api/doc", docRoutes)

server.listen(5001, () => {
  console.log("Server started on port: " + PORT);
  connectDB()
});