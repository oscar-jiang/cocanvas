import {useAuthStore} from "../store/useAuthStore.ts";
import {Link} from "react-router-dom";
import {Home, LogIn, LogOut, Menu, Settings, User} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useSidebarStore} from "../store/useSidebarStore.ts";
import {useModalStore} from "../store/useModalStore.ts";
import { useInboxStore } from "../store/useInboxStore.ts";

const Navbar = () => {
  const { getInbox, inbox } = useInboxStore();
  const {logout, authUser} = useAuthStore();
  const { toggleSidebar } = useSidebarStore();
  const { openCreateRoom } = useModalStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInboxClick = async () => {
    console.log("user id: ", authUser?.userId || "")
    await getInbox(authUser?.userId || "");
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {!authUser ? (
          <>
            <Link to={"/"} className="p-2 rounded-md cursor-pointer">
              <Home className="size-6 text-black " />
            </Link>
          </>
        )  : (
          <>
            <button
              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => {toggleSidebar()}}
            >
              <Menu className="w-5 h-5 text-black" />
            </button>

            <Link to={"/dashboard"} className="p-2 rounded-md cursor-pointer">
              <Home className="size-6 text-black " />
            </Link>
          </>
        )}
      </div>

      {/* Center section */}
      <div className="flex-1 flex justify-center">
        <div className="text-sm text-gray-600"></div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {!authUser ? (
          <>
            <Link to="/login" className="btn btn-outline btn-sm gap-2 text-black">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
            <Link to="/signup" className="btn btn-outline btn-success btn-sm gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Up</span>
            </Link>
          </>
        ) : (
          <>
            <button className="bg-blue-500 px-4 py-2 rounded-full text-sm font-bold cursor-pointer" onClick={() => handleInboxClick()}>
              📫 inbox</button>
            {console.log("inbox", inbox)}
            <button
              className="bg-blue-500 px-4 py-2 rounded-full text-sm font-bold cursor-pointer"
              onClick={() => {openCreateRoom()}}
            >
              ➕ Create
            </button>
            <div
              // className="h-8 w-8 bg-gray-400 rounded-full cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Settings className={"text-black size-6 cursor-pointer"} />
            </div>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                      <div className={"flex items-center gap-2"}>
                        <User className="w-4 h-4" />
                        Profile
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                      <div className={"flex items-center gap-2"}>
                        <Settings className="w-4 h-4" />
                        Settings
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {logout(); setMenuOpen(false)}}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                    >
                      <div className={"flex items-center gap-2"}>
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;