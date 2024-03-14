import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Register } from "../interfaces/auth.interface";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRegisterUser } from "../hooks/mutations/auth.mutations";
import { useState } from "react";

const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[^<>&]*$/, "Scripts or special characters are not allowed")
    .min(1, "Username is required")
    .max(20, "Must be less than 20 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .regex(/^[^<>&]*$/, "Scripts or special characters are not allowed")
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be less than 20 characters"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Register>({ resolver: zodResolver(RegisterSchema) });
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: Register) => {
    try {
      setIsSubmitting(true);
      await registerMutation.mutateAsync(data);
      navigate("/login");
      toast.success("Register successful!");
      reset();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Register your account
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="@username"
                autoComplete="off"
                className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                  errors.name ? "focus:border-red-500" : "focus:border-blue-600"
                } shadow-sm rounded-lg ${
                  errors.name ? "border-red-500" : "border"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
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
          </div>
          <button
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
          >
            {isSubmitting ? "Sign up..." : "Sign up"}
          </button>
          <div className="text-center">
            <p className="mt-2">
              Already have an account?
              <Link
                to="/login"
                className="font-medium ml-1 text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
