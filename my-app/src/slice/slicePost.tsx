import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../type";

interface PostState {
  post: Post[];
  loading: boolean;
  error: boolean;
}

const initialState: PostState = {
  post: [],
  loading: false,
  error: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllPost: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    getAllPostFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getAllPost, getAllPostFailure, getPostStart } =
  postSlice.actions;
export default postSlice.reducer;
