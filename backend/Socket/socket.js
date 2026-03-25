import {Server} from 'socket.io';
import http from 'http';
import express from 'express';



const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        // origin:['http://localhost:5173'],
           origin:['https://chatsphere-4pmw.onrender.com'],
        methods:["Get","Post"],
        credentials:true
    }
});


export const getReceiverSocketId=(receiverId)=>{
      console.log("Receiver ID:", receiverId);
    return userSocketmap[receiverId]
}

const userSocketmap={};


io.on('connection',(socket)=>{
   console.log("User connected", socket.id);

   const userId = socket.handshake.query.userId;
   console.log("UserId from socket:", userId);

   if(userId) userSocketmap[userId] = socket.id;

   console.log("Socket Map:", userSocketmap);

   //  send online users
   io.emit("getOnlyUsers", Object.keys(userSocketmap));

   socket.on('disconnect',()=>{
        delete userSocketmap[userId];
        io.emit('getOnlyUsers', Object.keys(userSocketmap));
   });

   socket.on("typing", (data) => {
  const receiverSocketId = userSocketmap[data.receiverId];

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("typing", {
      senderId: socket.handshake.query.userId
    });
  }
});
});

socket.on("stopTyping", (data) => {
  const receiverSocketId = userSocketmap[data.receiverId];
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("stopTyping", { senderId: data.senderId });
  }
});

export {app, io, server}











