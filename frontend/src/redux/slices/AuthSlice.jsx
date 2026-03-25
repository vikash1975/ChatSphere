import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { login, register } from '../../services/Api';
import socket from '../SocketContext';

export const registerUser=createAsyncThunk(
    "auth/register",

    async (formData,{rejectWithValue})=>{
        try {
            const res=await register(formData);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data);
        }
    }
)



export const loginUser = createAsyncThunk(
  "auth/loginUser",   
  async (formData, { rejectWithValue }) => {
    try {
      const res = await login(formData);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue(error.response?.data);
    }
  }
);


const authSlice=createSlice({
    name:"auth",
 initialState : {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null
},
    reducers:{
       logout: (state) => {
  state.user = null;
  state.token = null; 
  localStorage.removeItem("selectedUser");
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
  toast.success("Logged Out");
}
    },


    extraReducers:(builder)=>{
        builder

        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(registerUser.fulfilled,(state)=>{
            state.loading=false;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })


        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
        })
       .addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;

  console.log("LOGIN DATA:", action.payload);
  state.token = action.payload.token;
  state.user = action.payload.user;

  // localStorage sav
  localStorage.setItem("token", action.payload.token);
  localStorage.setItem("user", JSON.stringify(action.payload.user));

socket.io.opts.query = {
  userId: action.payload.user._id
};

socket.connect();
})
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
});

export const {logout}=authSlice.actions;
export default authSlice.reducer;