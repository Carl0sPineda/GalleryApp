import { useForm } from "react-hook-form";
import { Login } from "../interfaces/auth.interface";
import { useAuthStore } from "../stores/auth.store";

const Login = () => {
  const { register, handleSubmit } = useForm<Login>();
  const loginUser = useAuthStore((state) => state.loginUser);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const onSubmit = async (data: Login) => {
    try {
      await loginUser(data.email, data.password);
      //   navigate("/");
      //   toast.success("Login successful!");
    } catch (error) {
      //   if (error === "Unauthorized") {
      //     toast.error("Invalid Username or Password");
      //   } else {
      //     toast.error("An Error occurred. Please contact admins");
      //   }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-10"
      >
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            required
            {...register("email")}
            type="text"
            placeholder="Email"
            autoComplete="off"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
          />
        </div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            required
            {...register("password")}
            type="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="transform rounded-sm bg-indigo-700 py-2 duration-300 hover:bg-indigo-800 font-bold"
        >
          Login
        </button>
      </form>
      <button onClick={logoutUser}>logout</button>
    </div>
  );
};

export default Login;
