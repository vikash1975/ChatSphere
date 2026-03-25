import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, getMessages, addMessage } from "../redux/slices/ChatSlice";
import socket from '../redux/SocketContext';
import { ChevronLeftIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';

const ChatArea = ({ selectedUser, onBack }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state?.chat || {});
  const authState = useSelector((state) => state?.auth || {});
  const { messages = [] } = chatState;
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const currentUserId = authState?.user?._id;

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Fetch messages on user select
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [selectedUser?._id, dispatch]);

  // Listen for new messages
  useEffect(() => {
    const handleNewMessage = (msg) => {
      const exists = messages.some(m => m._id === msg._id);
      if (!exists) {
        dispatch(addMessage(msg));
        setTimeout(scrollToBottom, 100);
      }
    };
    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage', handleNewMessage);
  }, [dispatch, messages, scrollToBottom]);

  // Listen for online users
  useEffect(() => {
    socket.on("getOnlyUsers", (users) => setOnlineUsers(users));
    return () => socket.off("getOnlyUsers");
  }, []);

  // Typing indicator handlers
  useEffect(() => {
    const handleTyping = ({ senderId }) => {
      if (senderId?.toString() === selectedUser?._id?.toString()) setIsTyping(true);
    };
    const handleStopTyping = ({ senderId }) => {
      if (senderId?.toString() === selectedUser?._id?.toString()) setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [selectedUser?._id]);

  // Handle input typing with debounce
  const handleTyping = useCallback((e) => {
    const value = e.target.value;
    setMessage(value);

    if (!selectedUser?._id) return;

    // Emit typing immediately
    if (value.trim().length > 0) {
      socket.emit("typing", { receiverId: selectedUser._id, senderId: currentUserId });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Stop typing 2s after last keystroke
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { receiverId: selectedUser._id, senderId: currentUserId });
    }, 2000);

  }, [selectedUser?._id, currentUserId]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser?._id) {
      const text = message.trim();
      await dispatch(sendMessage({ receiverId: selectedUser._id, message: text }));
      setMessage('');

      // Stop typing on send
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      socket.emit("stopTyping", { receiverId: selectedUser._id, senderId: currentUserId });
    }
  };

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        if (selectedUser?._id) {
          socket.emit("stopTyping", { receiverId: selectedUser._id, senderId: currentUserId });
        }
      }
    };
  }, [selectedUser?._id, currentUserId]);

  if (!selectedUser) return <NoChatSelected />;

  const isOnline = onlineUsers.map(u => u.toString()).includes(selectedUser._id?.toString());

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Header */}
      <div className="p-6 border-b border-white/20 bg-white/5 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <span className="text-white font-semibold">{selectedUser.username?.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <h3 className="font-black text-white text-lg">{selectedUser.username}</h3>
                <div className={`text-sm font-semibold flex items-center space-x-2 ${isOnline ? "text-green-400" : "text-gray-400"}`}>
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-ping' : 'bg-gray-400'}`} />
                  {isOnline ? "Online" : "Offline"}
                </div>
                {isTyping && (
                  <div className="flex items-center space-x-2 mt-1 p-1 bg-black/20 rounded-lg">
                    <div className="flex space-x-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                    <span className="text-sm text-blue-300 font-medium">{selectedUser.username} is typing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent via-white/5 to-white/10">
        {messages.length === 0 ? (
          <NoMessages />
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={msg._id || index} msg={msg} isOwn={msg.senderId === currentUserId} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-6 border-t border-white/20 bg-white/5">
        <div className="flex items-end space-x-3">
          <input
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-3xl disabled:opacity-50 transition-all"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

// Message Bubble
const MessageBubble = ({ msg, isOwn }) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-md px-5 py-3 rounded-3xl ${isOwn ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/20 border border-white/30 text-white'}`}>
      <p className="whitespace-pre-wrap mb-2">{msg.message}</p>
      <div className="text-xs opacity-75 flex justify-end items-center">
        <span>Just now</span>
        {isOwn && <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
      </div>
    </div>
  </div>
);

// No messages placeholder
const NoMessages = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400">
    <SparklesIcon className="w-20 h-20 mb-6 text-purple-400/50 animate-pulse" />
    <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
      No messages yet
    </h3>
  </div>
);

// No chat selected placeholder
const NoChatSelected = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
    <SparklesIcon className="w-28 h-28 text-purple-400/50 animate-pulse mb-8" />
    <h2 className="text-4xl text-white font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text mb-4">
      Welcome to ChatSphere
    </h2>
    <p className="text-xl text-gray-300">Select a friend to start chatting</p>
  </div>
);

export default ChatArea;
