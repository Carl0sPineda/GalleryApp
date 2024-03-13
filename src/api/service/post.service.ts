import { AxiosError } from "axios";
import { Posts } from "../../interfaces/post.interface";
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
}
