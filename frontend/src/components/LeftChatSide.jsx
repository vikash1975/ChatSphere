


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser, setOnlineUsers } from "../redux/slices/ChatSlice";
import { getUsers } from '../redux/slices/UserSlice';
import { logout } from '../redux/slices/AuthSlice';
import socket from '../redux/SocketContext'
import { MagnifyingGlassIcon, SparklesIcon, EllipsisVerticalIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const LeftSidebar = ({ onUserSelect }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.user || {});
  const chatState = useSelector((state) => state?.chat || {});
  const { users = [], loading = false } = userState;
  const { onlineUsers = [] } = chatState;
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getUsers()); 
  }, [dispatch]);

  // Socket listeners
  useEffect(() => {
    socket.on('getOnlyUsers', (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off('getOnlyUsers');
    };
  }, [dispatch]);

  const filteredUsers = Array.isArray(users) ? users.filter(user =>
    user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleSelectUser = (user) => {
    dispatch(setSelectedUser(user));
  localStorage.setItem("selectedUser", JSON.stringify(user)); // 👈 add

    if (onUserSelect) onUserSelect(user);
  };

  const handleLogout = () => {
    socket.disconnect();
    dispatch(logout());
  };

  const isUserOnline = (userId) => onlineUsers.includes(userId);



  return (
    <div className="w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col animate-slide-in-left">
      {/* Header */}
      <div className="p-6 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-8 h-8 animate-pulse" />
          <h1 className="text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            ChatSphere
          </h1>
        </div>
        <button className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300">
          <EllipsisVerticalIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm transition-all duration-300"
          />
        </div>
      </div>

      {/* Users List + Logout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 space-y-3 py-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-purple-400/50 animate-pulse" />
              <p className="text-lg">No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = userState.selectedUser?._id === user._id;
              const isOnline = isUserOnline(user._id);
              
              return (
                <div
                  key={user?._id}
                  onClick={() => handleSelectUser(user)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] border border-transparent hover:border-white/30 flex items-center space-x-4 group ${
                    isSelected ? 'bg-white/30 border-white/50 scale-[1.02]' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.username?.slice(0, 2).toUpperCase() || 'U'}
                      </span>
                    </div>
                    {isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-ping"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-purple-200">
                      {user?.username || 'Unknown'}
                    </h3>
                    <p className="text-xs text-gray-300 truncate">
                      {user?.lastMessage || 'Start a conversation...'}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isOnline ? 'bg-green-400 animate-ping' : 'bg-white/30'}`}></div>
                </div>
              );
            })
          )}
        </div>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-white/20 bg-white/5 backdrop-blur-sm">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:scale-[1.02] cursor-pointer transition-all duration-300 group"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-300 group-hover:text-red-200 group-hover:animate-bounce flex-shrink-0" />
            <span className="font-semibold text-sm text-white/75 group-hover:text-white/90 tracking-wide">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;