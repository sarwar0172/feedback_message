import connectDB from "@/lib/dbconnect";
import UserModel from "@/model/user";



export async function POST(req:Request){
    await connectDB();
    try{
        const {username,code}=await req.json();
        const decoedUsername=decodeURIComponent(username);
        const user=await UserModel.findOne({username: decoedUsername});
        if(!user){
            return Response.json({success: false, message: "user not found"},{status: 404});
        }
        const iscodeCorrect=user.varifyCode===code;
        const isCodeNotExpire=new Date(user.verifyCodeExpires)>new Date(Date.now());
        if(iscodeCorrect && isCodeNotExpire){
            user.isVerified=true;
            await user.save();
            return Response.json({success: true, message: "user verified"},{status: 200});
        }else if(!isCodeNotExpire){
            return Response.json({success: false, message: "code expired"},{status: 400});
        }else{
            return Response.json({success: false, message: "wrong code"},{status: 400});
        }

    }catch(e){
        console.log(e);
        return Response.json({success: false, message: "something went wrong"},{status: 500});
    }
  
}