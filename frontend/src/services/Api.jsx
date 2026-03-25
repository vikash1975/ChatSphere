import axios from 'axios';

const Api=axios.create({
    baseURL:"https://chatsphere-backend-ejqy.onrender.com/api",
    withCredentials:true,
});
// Request Interceptor - Token automatically add
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Header me bhej do
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Users

export const register=(data)=>Api.post("/users/register",data);

export const login=(data)=>Api.post("/users/login",data);


// Chat Api's

export const sendMessageApi=(receiverId,message)=>Api.post(`/messages/send/${receiverId}`,{message});

export const getMessageApi=(receiverId)=>Api.get(`/messages/${receiverId}`);


// User Api

export const getChattersApi=()=>Api.get("/user/currentChatters");

export const getSearchApi = (query) => 
  Api.get(`/user/search?query=${query}`);


export default Api;
