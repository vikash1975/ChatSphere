import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import chatReducer from './slices/ChatSlice';
import  userReducer from './slices/UserSlice'
 export const store=configureStore({
    reducer:{
        auth:authReducer,
        chat:chatReducer,
        user:userReducer,
    },
});

