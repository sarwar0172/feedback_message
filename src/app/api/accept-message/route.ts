import connectDB from "@/lib/dbconnect"
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/user";






export const POST = async (req: Request) => {
    await connectDB();
    const session=await getServerSession(authOptions);
    const user:User=session?.user;

    if(!session || !session.user){
        return Response.json({message:"unauthorized"},{status: 401});
    }
    const userId=user.id;
    const {Acceptmessage}=await req.json();
    try{
       const updatedUser=await UserModel.findByIdAndUpdate({_id:userId},{isAcceptingMessages:Acceptmessage},{new: true});
       return Response.json({success: true, message: "message updated"},{status: 200});
    }catch(e){
        console.log(e);
        return Response.json({success: false, message: "something went wrong"},{status: 500});
    }
}

export async function GET(req:Request) {
    await connectDB()
    const session=await getServerSession(authOptions);
    const user:User=session?.user;
    if(!session || !session.user){
        return Response.json({message:"unauthorized"},{status: 401});
    }
    const userId=user.id;
    try{
        const foundUser=await UserModel.findOne({_id:userId});
        if(!foundUser){
            return Response.json({success: false, message: "user not found"},{status: 404});
        }
        return Response.json({success: true, message: "user found",isAcceptingMessages:foundUser.isAcceptingMessages},{status: 200});   
    }catch(e){
            console.log(e);
            return Response.json({success: false, message: "something went wrong"},{status: 500});
        }
}