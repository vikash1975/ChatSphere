import express from 'express';
import { auth } from '../middlewares/auth.js';
import { getCurrentChatters, getUserBySearch } from '../Controllers/searchController.js';
const searchRouter=express.Router();

searchRouter.get("/search",auth, getUserBySearch);

searchRouter.get("/currentChatters",auth, getCurrentChatters);


export default searchRouter;