import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessageApi, sendMessageApi } from "../../services/Api";
import socket from '../../redux/SocketContext'



//  get messages
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (receiverId, { rejectWithValue }) => {
    try {
      const res = await getMessageApi(receiverId);
      return res.data;
    } catch (err) {
         console.error('Chatters error:', error.response?.data);
      return rejectWithValue(err.response?.data);
    }
  }
);

//  send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const res = await sendMessageApi(receiverId, message);
      return res.data;
    } catch (err) {
         console.error('Chatters error:', error.response?.data);
      return rejectWithValue(err.response?.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
    onlineUsers:[],
    loading: false,
     currentUserId: localStorage.getItem('chatUserId') || null,
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
      // Socket ko reconnect karo new userId ke saath
      socket.disconnect();
      socket.connect({ query: { userId: action.payload } });
    }
  },

  extraReducers: (builder) => {
    builder

    
    
      // messages
            .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })

       .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // send message
            .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })

        .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { setMessages, setSelectedUser, addMessage, setOnlineUsers, setCurrentUserId } = chatSlice.actions;
export default chatSlice.reducer;