import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import gallery from "../assets/gallery.svg";

const Header = () => {
  const { isAuth, user } = useAuthStore();
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-xl border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link to="/" className="flex items-center">
              <img className="h-7 w-auto" src={gallery} alt="Gallery.svg" />
              <span className="ml-2 font-medium">GalleryApp</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link
              to="/"
              className={`inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-gray-100 text-gray-900"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            {isAuth && (
              <Link
                to={`/my-posts/${user?.id}`}
                className={`inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 ${
                  location.pathname === `/my-posts/${user?.id}`
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                My posts
              </Link>
            )}

            {isAuth && (
              <Link
                to="/add-post"
                className={`inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 ${
                  location.pathname === "/add-post"
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Add post
              </Link>
            )}
          </div>
          <div className="flex items-center justify-end gap-3">
            {isAuth ? (
              <>
                <span className="text-gray-900 text-sm font-medium">
                  Welcome, {user?.name}
                </span>
                <button
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                >
                  Register
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
