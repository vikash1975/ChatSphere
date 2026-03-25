



import { io } from 'socket.io-client';

const socket = io('https://chatsphere-backend-ejqy.onrender.com', {
  autoConnect: false,
  // withCredentials: true
});

export default socket;
