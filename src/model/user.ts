import mongoose, { Schema,Document } from "mongoose";

export interface Message extends Document {
    content:string,
    createdAt:Date,
}

const messageSchema:Schema<Message> = new Schema<Message>({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export interface User extends Document {
    username:string,
    password:string,
    email:string,
    varifyCode:string,
    verifyCodeExpires:Date,
    isVerified:boolean,
    isAcceptingMessages:boolean,
    messages:Message[],
}

// user schema

const UserSchema:Schema<User> = new Schema<User>({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ,"please enter a valid email"],
    },
    varifyCode:{
        type:String,
        required:[true,"varify code is required"],
    },
    verifyCodeExpires:{
        type:Date,
        required:[true,"verify code expires is required"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,   
    },
    messages:[messageSchema],
})

const UserModel = (mongoose.models.User as mongoose.Model<User>)|| mongoose.model<User>("User",UserSchema);

export default UserModel





    
  



