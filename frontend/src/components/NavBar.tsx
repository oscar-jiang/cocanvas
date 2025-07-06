import {useAuthStore} from "../store/useAuthStore.ts";
import {Link} from "react-router-dom";
import {LogIn, LogOut, Settings, User} from "lucide-react";

const Navbar = () => {
  const {logout, authUser} = useAuthStore();

  return (
    <header className="navbar bg-base-100 shadow-sm border-b border-base-300">
      <div className="flex justify-between items-center w-full px-4">
        {/* Logo/Brand Section */}
        <div className="flex items-center">
          <Link
            to={authUser ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <h1 className="text-lg font-bold">
              Home
            </h1>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {!authUser ? (
            // Guest Navigation
            <>
              <Link to="/login" className="btn btn-ghost btn-sm gap-2">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </>
          ) : (
            // Authenticated Navigation
            <>
              <Link to="/settings" className="btn btn-ghost btn-sm gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              <Link to="/profile" className="btn btn-ghost btn-sm gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="btn btn-ghost btn-sm gap-2 text-error hover:bg-error/10"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;