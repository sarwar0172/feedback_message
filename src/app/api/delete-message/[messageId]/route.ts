import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {User} from "next-auth";
import mongoose from "mongoose";


export async function DELETE(req:Request,{params}:{params:{messageId:string}}){
     const messageID=params.messageId
    await dbConnect();
    const session =await  getServerSession(authOptions);
    const user:User=session?.user

    if(!session ||!session.user){
         return Response.json({success:false,message:"Not authenticated"},{status:404})
    }

    try{
   const updateResult=  await UserModel.updateOne({username:user.username},{$pull:{messages:{_id:messageID}}})

    if(updateResult.modifiedCount===0){
        return Response.json({success:false,message:"message not found"},{status:404})
    }
     return Response.json({success:true,message:"message deleted successfully"},{status:200})
    }catch(e){
        console.log("Error deleteing message",e)
        return Response.json({success:false,message:"Error deleteing message"},{status:500})

    
    
    
   
    
      }
}  
