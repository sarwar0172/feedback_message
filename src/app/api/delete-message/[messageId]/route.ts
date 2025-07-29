import connectDB from "@/lib/dbconnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/user";



export async function DELETE(request: Request,{params}:{params:{messageId:string}}) {
    await connectDB()
    const messageId=params.messageId;
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !session.user) {
        return Response.json({ message: "unauthorized" }, { status: 401 });
    }
    try{
        const updatedUser=await UserModel.findOneAndUpdate({username:user.username},{$pull:{messages:{_id:messageId}}},{new: true});
        if(!updatedUser){
            return Response.json({success: false, message: "message not found"},{status: 404});
        }        
        return Response.json({success: true, message: "message deleted"},{status: 200});
    }catch(e){
        console.log(e);
        return Response.json({success: false, message: "something went wrong while deleteing "},{status: 500});
    }
    
}