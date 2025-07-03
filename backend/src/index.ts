import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {connectDB} from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// extract json data from the request body
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(5001, () => {
    console.log("Server started on port: " + PORT);
    connectDB()
});