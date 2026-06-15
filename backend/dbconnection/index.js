import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constant.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: DB_NAME,
    });

    const connectionInstance = mongoose.connection;
    console.log(`Connected to MongoDB !! DB HOST : ${connectionInstance.host} , DB PORT : ${connectionInstance.port} , DB NAME : ${connectionInstance.name}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;