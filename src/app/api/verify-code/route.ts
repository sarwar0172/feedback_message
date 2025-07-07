import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export async function POST(req:Request){
    await dbConnect();
    try{

        const {username,code}=await req.json();
       const decoedusername= decodeURIComponent(username);
      const user= await UserModel.findOne({username:decoedusername})

      if(!user){
        return Response.json({success:false,message:"user not found"},{status:404})
      }
      const isCodeCorrect=user.varifyCode===code;
      const isCodeNotExpire=new Date(user.verifyCodeExpires)>new Date();
      if(isCodeCorrect && isCodeNotExpire){
        user.isVerified=true;
        await user.save();
        return Response.json({success:true,message:"user varified"},{status:200})
      }else if(!isCodeCorrect){
        return Response.json({success:false,message:"invalid code"},{status:400})
      }else if(!isCodeNotExpire){
        return Response.json({success:false,message:"code expired"},{status:400})
      }else{
        return Response.json({success:false,message:"something went wrong while varifing user"},{status:500})
      }
      
           
       

    }catch(e){
        console.log('varifing user error',e)
        return Response.json({success:false,message:"varifing user error"},{status:500})
    }
}