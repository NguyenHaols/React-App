import axios from "axios";
import { Post } from "../type";

export const getPostAPI = async () => {
  const response = await axios.get<Post[]>(`https://jsonplaceholder.org/posts`);
  return response.data;
};

export const getPostByIdAPI = async (id: number) => {
  const response = await axios.get<Post>(
    `https://jsonplaceholder.org/posts/${id}`
  );
  return response.data;
};
