import { AxiosError } from "axios";
import { Posts, Post } from "../../interfaces/post.interface";
import { axiosInstance } from "../config/axiosInstance";

export class PostService {
  static getAllposts = async (): Promise<Posts[]> => {
    try {
      const { data } = await axiosInstance.get<Posts[]>("/posts");
      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unable to get posts");
    }
  };

  static addPost = async (post: Post): Promise<Post> => {
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("userId", post.userId);
      if (post.image) {
        formData.append("image", post.image[0]);
      }

      const { data } = await axiosInstance.post<Post>("/posts", formData);

      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error("Unable to add post");
    }
  };
}
