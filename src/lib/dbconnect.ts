require('dotenv').config()
import mongoose from "mongoose";

type connectionObjeect={
    isConnected?:number;
}
const connection:connectionObjeect={}

async function connectDB(){
    if(connection.isConnected){
        console.log("already connected to the database");
        return;

    }
    try{
        const db=await mongoose.connect(process.env.MONGODB_URI as string || "");
        connection.isConnected=db.connections[0].readyState;
        console.log("connected to the database");
    }catch(error){
        console.log("error connecting to the database", error);
    }
}
export default connectDB;