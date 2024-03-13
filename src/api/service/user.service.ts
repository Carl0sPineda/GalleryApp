import { AxiosError } from "axios";
import { Users } from "../../interfaces/user.interface";
import { axiosInstance } from "../config/axiosInstance";

export class UserService {
  static getAllusers = async (): Promise<Users[]> => {
    try {
      const { data } = await axiosInstance.get<Users[]>("/users");
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
