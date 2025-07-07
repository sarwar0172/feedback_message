import {resend} from '@/lib/resend'
import VerificationEmail from '../../emails/verificationEmail'

import { ApiResponse } from '@/types/ApiResponse'


export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try{
        await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'mistry message | verification code',
  react: VerificationEmail({ username, otp: verifyCode }),
});
return({
    success:true,
    message:"email sent successfully",
});
    }catch(e){
        console.log("failed to send verification email",e)
        return{
            success:false,
            message:"failed to send verification email",
        }
    }
}