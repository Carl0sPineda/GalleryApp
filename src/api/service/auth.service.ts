import { AxiosError } from "axios";
import { axiosInstance } from "../config/axiosInstance";
import { LoginResponse } from "../../interfaces/auth.interface";
import { Register } from "@tanstack/react-query";
import toast from "react-hot-toast";

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unable to login");
    }
  };

  static Register = async (user: Register): Promise<Register> => {
    try {
      const { data } = await axiosInstance.post<Register>(
        "/auth/register",
        user
      );
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.status === 409) {
          toast.error("The email is already in use");
        }
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error("Unable to register user");
    }
  };
}
