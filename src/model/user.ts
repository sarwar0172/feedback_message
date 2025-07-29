import mongoose, {Schema, Document, Types } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const messageSchema:Schema<Message> = new Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

export interface User extends Document{
    username: string;
    password: string;
    email: string;
    messages: Message[];
    varifyCode: string;
    verifyCodeExpires: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;

}

// user schema

const UserSchema:Schema<User>=new Schema<User>({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],

    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    messages:{
        type: [messageSchema],
        default: [],
    },
    varifyCode:{
        type: String,
    },
    verifyCodeExpires:{
        type: Date,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAcceptingMessages:{
        type: Boolean,
        default: true,
    }
    
})

const UserModel=(mongoose.models.User as mongoose.Model<User>) ||mongoose.model<User>("User", UserSchema);

export default UserModel;