import express from 'express';
import { login, userRegister } from '../Controllers/userController.js';

const userRouter=express.Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", login);



export default userRouter;