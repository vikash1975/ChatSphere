import mongoose, { mongo } from "mongoose";
import Conversation from "./conversationModel.js";

const messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
        required:true
    },

    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        default:[]
    },

},{timeStamps:true});

const Message=mongoose.model("Message",messageSchema);

export default Message;