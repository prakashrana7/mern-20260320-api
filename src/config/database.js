import mongoose from "mongoose";
import config from "./config.js";

function connetDB(){
    mongoose.connect(config.mongodbUrl).then(()=>{
    console.log("MongoDB connected successfully.");
}).catch((error)=>{
    console.log(error);
});
}
export default connetDB;