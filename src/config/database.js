import mongoose from "mongoose";
import config from "./config.js";
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
 try {
        if (!config.mongodbUrl) {
            throw new Error("MONGODB_URL is not configured.");
        }

    await mongoose.connect(config.mongodbUrl, {
            serverSelectionTimeoutMS: 10000,
        });
 
      console.log("MongoDB connected successfully.");
    } catch(error) {
      console.error("MongoDB connection failed:", error.message);

      throw error;
    }
};

export default connectDB;