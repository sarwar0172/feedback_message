import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {User} from "next-auth";




export const POST = async (req: Request) => {
  await dbConnect();
const session =await  getServerSession(authOptions);
const user:User=session?.user

if(!session ||!session.user){
     return Response.json({success:false,message:"Not authenticated"},{status:404})
}
  const userId=user._id;
  const {acceptmessage}=await req.json();

  try{
    const updatedUser=await UserModel.findOneAndUpdate({_id:userId},{isAcceptingMessages:acceptmessage},{new:true});
    if(!updatedUser){
      return Response.json({success:false,message:"User not found to update"},{status:404})
    }
    return Response.json({success:true,message:"User status updated successfully",updatedUser},{status:200})
  }catch(e){
    console.log("failed to update user satatus to accept messages")
    return Response.json({success:false,message:"failed to update user satatus to accept messages"},{status:500})
  }
  
}

export async function GET(req:Request){
    await dbConnect();
    const session =await  getServerSession(authOptions);
    const user:User=session?.user

    if(!session ||!session.user){
         return Response.json({success:false,message:"Not authenticated"},{status:404})
    }
    const userId=user._id;
    try{
        const user=await UserModel.findOne({_id:userId});
        if(!user){
            return Response.json({success:false,message:"User not found"},{status:404})
        }
        return Response.json({success:true,isAcceptingMessages:user.isAcceptingMessages,user},{status:200})
    }catch(e){
        console.log("failed to find user",e)
        return Response.json({success:false,message:"failed to find user"},{status:500})
    }
}