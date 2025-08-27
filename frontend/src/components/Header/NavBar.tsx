import { useAuthStore } from "../../store/useAuthStore.ts";
import { Link } from "react-router-dom";
import { LogIn, MailIcon, Search, User } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { useInboxStore } from "../../store/useInboxStore.ts";
import InboxDropdown from "./InboxDropdown.tsx";
import MenuDropdown from './MenuDropdown.tsx';

const Navbar = () => {
  const { getInbox } = useInboxStore();
  const { authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (inboxRef.current && !inboxRef.current.contains(event.target as Node)) {
        setInboxOpen(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
      setInboxOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInboxClick = async () => {
    await getInbox(authUser?.userId || "");
    setInboxOpen(!inboxOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-50 py-4 bg-white rounded-b-3xl drop-shadow-xl border-b-4 border-gray-300 font-nunito">
      {/* Inner Container */}
      <div className={'w-full max-w-[1100px] mx-auto h-full flex items-center justify-between px-6'}>

        {/* Left section */}
        <div className="flex items-center gap-4">
          {!authUser ? (
            <>
              <Link to={"/"} className="flex gap-10 p-2 rounded-md cursor-pointer items-center">
                <div className={"size-[42px] bg-gray-300 rounded-full border-2 border-gray-500"}>
                </div>
                <h1 className={'font-nunito font-black text-gray-500 text-xl'}>
                  CoCanvas
                </h1>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/home"} className="flex gap-10 p-2 rounded-md cursor-pointer items-center">
                <div className={"size-[42px] bg-gray-300 rounded-full border-2 border-gray-500"}></div>
                <h1 className={'font-nunito font-black text-gray-500 text-xl'}>
                  CoCanvas
                </h1>
              </Link>
            </>
          )}
        </div>

        {/* Center section */}
        <div className="flex-1 flex justify-center">
          <div className={'relative w-full max-w-md'}>
            <input
              type="text"
              placeholder="Search"
              className={'w-full pl-12 pr-4 py-2 border-3 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 text-gray-500 font-bold'}
            />
            <Search
              className={'absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 size-5'}
              strokeWidth={3.5}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 relative" ref={menuRef}>
          {!authUser ? (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm gap-2 text-black"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline btn-success btn-sm gap-2"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </>
          ) : (
            <div className={'flex flex-1 items-center gap-10'}>
              {/*Inbox*/}
              <div className={'flex gap-20 p-2 rounded-md cursor-pointer items-center'}>
                <button onClick={() => handleInboxClick()}>
                  <MailIcon className={'size-[42px] text-gray-400'} />
                </button>
                {/*InboxDropdown Dropdown*/}
                {inboxOpen && <InboxDropdown />}
              </div>

              {/*User*/}
              <div onClick={() => setMenuOpen(!menuOpen)}>
                <div className={"size-[42px] bg-gray-300 rounded-full border-2 border-gray-500"}></div>
              </div>
              {/* Dropdown */}
              {menuOpen && <MenuDropdown setMenuOpen={setMenuOpen} />}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
