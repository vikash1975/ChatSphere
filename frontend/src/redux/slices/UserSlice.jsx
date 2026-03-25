

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChattersApi, getSearchApi } from "../../services/Api";

// get all users
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getChattersApi();
      console.log(res.data);
      
      return res.data;
    } catch (err) {
        console.log(err);
        
      return rejectWithValue(err.response?.data);
    }
  }
);

// search users
export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getSearchApi(query);
      console.log(res.data);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    searchResults: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // get users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users=action.payload;
        state.users=action.payload.users || [];
        
        
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      })

      // search users
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.searchResults=action.payload.users || [];
      });
  },
});

export default userSlice.reducer;