import { useForm } from "react-hook-form";
import { Login } from "../interfaces/auth.interface";
import { useAuthStore } from "../stores/auth.store";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm<Login>();
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmit = async (data: Login) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      if (error === "Unauthorized") {
        toast.error("Invalid Username or Password");
      } else {
        toast.error("An Error occurred. Please contact admins");
      }
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
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
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
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150">
            Sign in
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
