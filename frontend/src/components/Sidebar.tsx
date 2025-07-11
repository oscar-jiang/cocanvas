import {useLocation, useNavigate} from "react-router-dom";
import {useSidebarStore} from "../store/useSidebarStore.ts";
import {Home, LayoutGrid} from "lucide-react";

const Sidebar = () => {
  const { isMinimized } = useSidebarStore();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className={`${isMinimized ? "w-20" : "w-64"} h-screen bg-white text-gray-800 flex flex-col justify-between px-3 py-6 transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0`}>
      <div>
        <nav className="space-y-4 text-xl">
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex items-center space-x-3 text-left px-4 py-2 rounded-lg w-full ${location.pathname === '/dashboard' ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'} cursor-pointer`}
          >
            <Home className={"size-6"} />
            {!isMinimized && <span className={`transition-all duration-200 origin-left ${isMinimized ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${isMinimized ? 'w-0' : 'w-auto'} whitespace-nowrap overflow-hidden`}>Home</span>}
          </button>

          <button
            onClick={() => navigate('/projects')}
            className={`flex items-center space-x-3 text-left px-4 py-2 rounded-lg w-full ${location.pathname === '/projects' ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'} cursor-pointer`}
          >
            <LayoutGrid className={"size-6"} />
            {!isMinimized && <span className={`transition-all duration-200 origin-left ${isMinimized ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${isMinimized ? 'w-0' : 'w-auto'} whitespace-nowrap overflow-hidden`}>Projects</span>}
          </button>

          <button
            onClick={() => navigate('/notifications')}
            className={`flex items-center space-x-3 text-left px-4 py-2 rounded-lg w-full ${location.pathname === '/notifications' ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'} cursor-pointer`}
          >
            <span className="bg-purple-400 h-6 w-6 rounded-full"></span>
            {!isMinimized && <span className={`transition-all duration-200 origin-left ${isMinimized ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${isMinimized ? 'w-0' : 'w-auto'} whitespace-nowrap overflow-hidden`}>Notifications</span>}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;