import connectDB from "@/lib/dbconnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVarificationEmail } from "@/helpers/sendVarificationEmail";


export async function POST(request: Request) {
    await connectDB();
    try{
        const {username, email, password, confirmPassword}=await request.json();
        const otp=String(Math.floor(100000 + Math.random() * 900000));
        const existuserbyusername=await UserModel.findOne({username,isVerified: true});

        if(existuserbyusername){
            return Response.json({success: false, message: "username already exist"},{status: 400});
        }
        if(password !== confirmPassword){
            return Response.json({success: false, message: "passwords do not match"},{status: 400});
        }
        const existuserbyemail=await UserModel.findOne({email});
        if(existuserbyemail){
            if(existuserbyemail.isVerified){
                return Response.json({success: false, message: "email already exist"},{status: 400});
            }else{
                const hasspassword=await bcrypt.hash(password, 10);
                existuserbyemail.password=hasspassword;
                existuserbyemail.username = username;
                existuserbyemail.varifyCode=otp;
                existuserbyemail.verifyCodeExpires=new Date(Date.now() + 60 * 60 * 1000);
                await existuserbyemail.save();
                
            }
        }else{
            const hasspassword=await bcrypt.hash(password, 10);
            const expiryDate=new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newuser=new UserModel({
                username,
                email,
                password: hasspassword,
                varifyCode: otp,
                verifyCodeExpires: expiryDate,
                isVerified: false,
                isAcceptingMessages: false,
                messages: [],
            })
            await newuser.save();

            

        }
        const result=await sendVarificationEmail(username, email, otp);
        if(!result.success){
            return  Response.json({success: false, message: "error sending email"},{status: 500});
        }
        return Response.json({success: true, message: "user created successfully"},{status: 201});
    }catch(error){
        console.log(error);
        return Response.json({success: false, message: "error creating user"},{status: 500});
    }
}