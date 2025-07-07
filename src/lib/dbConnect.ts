require('dotenv').config()
import mongoose from "mongoose";


type connectionObject={
    isConnected?:number
}
const connection:connectionObject={}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("already connected")
        return
    }
    try{
        const db= await mongoose.connect(process.env.MONGODB_URI || "")
         connection.isConnected=db.connections[0].readyState
         console.log("db connected")
    }catch(e){
        console.log("connetion failed",e)
        process.exit(1)
    }
    
}
export default dbConnect