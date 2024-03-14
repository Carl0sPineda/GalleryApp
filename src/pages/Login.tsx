import { useForm } from "react-hook-form";
import { Login } from "../interfaces/auth.interface";
import { useAuthStore } from "../stores/auth.store";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .regex(/^[^<>&]*$/, "Scripts or special characters are not allowed")
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be less than 20 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmit = async (data: Login) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/");
      toast.success("Login successful!");
      reset();
      setIsSubmitting(true);
    } catch (error) {
      if (error === "Unauthorized") {
        toast.error("Invalid Username or Password");
      } else {
        toast.error("An Error occurred. Please contact admins");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Login your account
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="example@gmail.com"
              autoComplete="off"
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                errors.email ? "focus:border-red-500" : "focus:border-blue-600"
              } shadow-sm rounded-lg ${
                errors.email ? "border-red-500" : "border"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
              autoComplete="off"
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                errors.password
                  ? "focus:border-red-500"
                  : "focus:border-blue-600"
              } shadow-sm rounded-lg ${
                errors.password ? "border-red-500" : "border"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
          >
            {isSubmitting ? "Sign in..." : "Sign in"}
          </button>
          <div className="text-center">
            <p className="mt-2">
              Don't have an account?
              <Link
                to="/register"
                className="font-medium ml-1 text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
