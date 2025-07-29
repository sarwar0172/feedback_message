import connectDB from "@/lib/dbconnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";






export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials:any):Promise<any> {
                await connectDB();
                try{
                    const user=await UserModel.findOne({
                        $or: [
                            { username: credentials.identifier },
                            { email: credentials.identifier },
                        ]
                    })
                    if(!user){
                        throw new Error("user not found");
                    }
                    if(!user.isVerified){
                        throw new Error("user not verified");
                    }
                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password);
                    if(!isPasswordCorrect){
                        throw new Error("wrong password");
                    }
                    return user;
                }catch(e){
                    console.log(e);
                    return null;
                }
            }
            
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id?.toString();
                token.username = user.username;
                token.email = user.email;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }
            return session;
        },
    },
    pages:{
        signIn:"/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}