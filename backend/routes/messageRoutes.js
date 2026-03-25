import express from 'express';
import { getMessages, sendMessage } from '../Controllers/messageController.js';
import { auth } from '../middlewares/auth.js';

const messageRouter=express.Router();

messageRouter.post("/send/:id",auth,sendMessage);

messageRouter.get("/:id",auth,getMessages);

export default messageRouter;