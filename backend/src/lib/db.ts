import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
  try {
    dotenv.config();
    const db_url = process.env.MONGODB_URL;
    if (!db_url) {
      throw new Error("MongoDB connection returned null");
    }
    await mongoose.connect(db_url);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
}