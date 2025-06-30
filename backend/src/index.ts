import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.route.js"
import {connectDB} from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5001, () => {
    console.log("Server started on port: " + PORT);
    connectDB()
});