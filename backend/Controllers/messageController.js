import Conversation from "../Models/conversationModel.js";
import Message from "../Models/messageSchema.js";
import { getReceiverSocketId ,io} from "../Socket/socket.js";

export const sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user.id;

        let chats=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
            
        });

        if(!chats){
         chats=await Conversation.create({
            participants:[senderId,receiverId],
            message:[]
         })
        }

        const newMessages=new Message({
            senderId,
            receiverId,
            message,
            conversationId:chats.id
        });

        if(newMessages){
            chats.messages.push(newMessages.id)
        }

        await Promise.all([chats.save(),newMessages.save()])

        // function socket.io
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessages)
        }

        res.status(200).json( newMessages);
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}





export const getMessages=async(req,res)=>{
    try {
        const {id:receiverId}=req.params;
        const senderId=req.user.id;

        let chats=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages");

        if(!chats) return res.status(200).json([]);

        const message=chats.messages;
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({success:false,error:error.message});
    }
}





