import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './DB/dbConnect.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import cookieParser from 'cookie-parser';

import {app,server} from './Socket/socket.js'
dotenv.config();

app.use(express.json());
app.use(cors({
  origin: "https://chatsphere-4pmw.onrender.com",
  credentials: true,               // cookies bhejne ke liye
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/api/users", userRouter);
app.use("/api/messages",messageRouter);
app.use("/api/user",searchRouter);

let port=process.env.PORT;
server.listen(port,(req,res)=>{
    dbConnect()
    console.log(`Listening to the port ${port}`);
})
