import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendvarificationEmail";


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const otp=Math.floor(Math.random() * 10000).toString();
        const existingUserbyusername = await User.findOne({
            username,
            isVerified: true
        });

        if (existingUserbyusername) {
            return Response.json({ success: false, message: "User already exists" }, { status: 400 })
        }

        const existingUserbyemail = await User.findOne({email});

        if (existingUserbyemail) {
            
            if(existingUserbyemail.isVerified){
                return Response.json({ success: false, message: "User already exists" }, { status: 400 })
            }else{
                const hasspassword = await bcrypt.hash(password, 10);
                existingUserbyemail.password = hasspassword;
                existingUserbyemail.varifyCode = otp;
                existingUserbyemail.verifyCodeExpires = new Date(Date.now() + 60 * 60 * 1000);
                await existingUserbyemail.save();
                
            }

        }else {
            const hasspassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

           const newUser = await new User({
                username,
                email,
                password: hasspassword,
                varifyCode: otp,
                verifyCodeExpires: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            }).save();
            
        }
        const result = await sendVerificationEmail(email, username, otp);
            if(!result.success){
                return Response.json({ success: false, message: "Error sending verification email" }, { status: 500 })
            }
            return Response.json({ success: true, message: "User registered successfully" }, { status: 200 })
    } catch (e) {
        console.log('Error registering user', e)
        return new Response(JSON.stringify({ success: false, message: "Error registering user" }), { status: 500 })
    }
}