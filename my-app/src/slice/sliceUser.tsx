import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER } from "../Layout/defaultLayout/DefaultLayout";

interface USERSTATE {
  user: USER[];
  loading: boolean;
  error: string | null;
}

const initialState: USERSTATE = {
  user: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUserById: (state, action: PayloadAction<number>) => {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      });
  },
});

export const { removeUserById } = userSlice.actions;

export default userSlice.reducer;
