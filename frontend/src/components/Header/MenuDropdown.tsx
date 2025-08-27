import { Link } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore.ts';

interface MenuDropdownProps {
  setMenuOpen: (open: boolean) => void;
}

const MenuDropdown = ({ setMenuOpen }: MenuDropdownProps) => {
  const { logout } = useAuthStore();

  return (
    <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
      <ul className="py-2 text-sm text-gray-700">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <div className={"flex items-center gap-2"}>
              <User className="w-4 h-4" />
              Profile
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <div className={"flex items-center gap-2"}>
              <Settings className="w-4 h-4" />
              Settings
            </div>
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
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
  );
};

export default MenuDropdown;