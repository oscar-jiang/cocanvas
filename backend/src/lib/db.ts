import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () : Promise<void> => {
  try {
    dotenv.config();
    const db_url : string | undefined = process.env.MONGODB_URL;
    if (!db_url) {
      throw new Error("MongoDB url is not defined in the environment variables");
    }
    await mongoose.connect(db_url);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
}