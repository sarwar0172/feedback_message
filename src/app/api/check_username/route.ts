import connectDB from "@/lib/dbconnect";
import UserModel from "@/model/user";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema=z.object({
    username:usernameValidation,
})

export async function GET(req:Request){
   await connectDB()
   try{
    const {searchParams}=new URL(req.url);
    const queryparam={
        username:searchParams.get("username")
    }
    // validation with zod
    const result=UsernameQuerySchema.safeParse(queryparam);
    if(!result.success){
       const userNmaeErrors=result.error.format().username?._errors || [];
        return Response.json({success: false, message: userNmaeErrors,errors: userNmaeErrors},{status: 400});
    }
    const {username}=result.data;
    const existingUser=await UserModel.findOne({username,isVerified: true});

    if(existingUser){
        return Response.json({success: false, message: "username already exist"},{status: 400});
    }else{
        return Response.json({success: true, message: "username available"},{status: 200});
    }

   }catch(err){
      console.log("error checking username",err);
      return Response.json({success: false, message: "error checking username"},{status: 500});
   }
}