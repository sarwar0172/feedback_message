import connectDB from "@/lib/dbconnect";
import UserModel, { Message } from "@/model/user";



export async function POST(req:Request) {
    await connectDB()
    const {username,message}=await req.json();
    try{
        const user=await UserModel.findOne({username});
        if(!user){
            return Response.json({success: false, message: "user not found"},{status: 404});
        }
        if(!user.isAcceptingMessages){
            return Response.json({success: false, message: "user is not accepting messages"},{status: 400});
        }
    const newMessage = {
      content: message,
      createdAt: new Date(),
    };
         
        user.messages.push(newMessage as Message);
        await user.save();
        return Response.json({success: true, message: "message sent"},{status: 200});

    }catch(e){
        console.log(e);
        return Response.json({success: false, message: "something went wrong"},{status: 500});
    }

}