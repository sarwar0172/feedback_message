import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVarificationEmail(
    username: string,
    email: string,
    otp: string
):Promise<ApiResponse> {
    try{
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "verify your email",
            react: VerificationEmail({ username, otp }),
        })
        return ({
            success: true,
            message: "email sent successfully",
            isAcceptingMessage: true
        })
    }catch(error){
        console.log(error);
        return {success: false, message: "error sending email"}
    }
}