import mongoose from "mongoose";
import config from "./config.js";
import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);

function connectDB() {
  mongoose
    .connect(config.mongodbUrl)
    .then(() => {
      console.log("MongoDB connected successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
}

export default connectDB;