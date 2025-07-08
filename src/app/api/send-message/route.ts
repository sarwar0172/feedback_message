import UserModel from "@/model/user";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/user";

export async function POST(req: Request) {
    await dbConnect();
     const { username, content } = await req.json();
    try {
       const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({ success: false, message: "user not found" }, { status: 404 })
        }
        // is user acception messages
        if (!user.isAcceptingMessages) {
            return Response.json({ success: false, message: "user is not accepting messages" }, { status: 403 })
        }
        const newmessage = {
            content,
            createdAt: new Date(),
        }
        user.messages.push(newmessage as Message);
        await user.save();
        return Response.json({ success: true, message: "message sent successfully" }, { status: 200 })

        
     
        
       

    } catch (e) {
        console.log("failed to send message", e)
        return Response.json({ success: false, message: "failed to send message" }, { status: 500 })
    }
        
}