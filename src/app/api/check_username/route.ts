import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {z} from "zod";
import { usernameValidateion } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidateion,
})

export async function GET(req:Request){
    await dbConnect();
    try{
        const {searchParams}=new URL(req.url);
        const queryParam={
            username:searchParams.get("username")
        }
    //validation with zod
   const result= UsernameQuerySchema.safeParse(queryParam);
   console.log(result)
   if(!result.success){
       const userNmaeErrors=result.error.format().username?._errors || [];
       return Response.json({ success: false, message: "username validation error", errors: userNmaeErrors }, { status: 400 })
   }
   const {username}=result.data;

   const existingUser=await UserModel.findOne({username,isVerified:true});

   if(existingUser){
       return Response.json({ success: false, message: "username already exists" }, { status: 400 })
   }

   return Response.json({ success: true, message: "username available" }, { status: 200 })
    }catch(e){
        console.log("error checking username", e)
        return Response.json({ success: false, message: "error checking username" }, { status: 500 })
    }
}