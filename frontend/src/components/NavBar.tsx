import {useAuthStore} from "../store/useAuthStore.ts";
import {Link} from "react-router-dom";
import {LogOut, MessageSquare, Settings, User} from "lucide-react";

const Navbar = () => {
  const {logout, authUser} = useAuthStore();

  return (
    <header>
      <div className={"flex justify-between items-center h-full"}>
        <div className={"flex items gap-8"}>
          <Link to={"/"} className={"flex items-center gap-2.5 hover:opacity-80 transition-all"}>
            <div className={"w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"}>
              <MessageSquare className={"w-5 h-5 text-primary"}/>
              <h1 className={"text-lg font-bold"}>
                Home
              </h1>
            </div>
          </Link>
        </div>

        <div className={"flex items-center gap-2"}>
          <Link to={"/settings"} className={"btn btn-sm gap-2 transition-colors"}>
            <Settings className={"w-4 h-4"}/>
            <span className={"hidden sm:inline"}>Settings</span>
          </Link>
        </div>

        {
          authUser && (
            <>
              <div className={"flex items-center gap-2"}>
                <Link to={"/profile"} className={"btn btn-sm gap-2 transition-colors"}>
                  <User className={"w-4 h-4"}/>
                  <span className={"hidden sm:inline"}>Profile</span>
                </Link>
              </div>

              <div className={"flex items-center gap-2"}>
                <button className={"flex gap-2 items-center"} onClick={logout}>
                  <LogOut className={"w-4 h-4"}/>
                  <span className={"hidden sm:inline"}>Log Out</span>
                </button>
              </div>
            </>
          )
        }
      </div>
    </header>
  );
};

export default Navbar;