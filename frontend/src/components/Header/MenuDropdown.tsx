import { LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { formatMonthYear } from '../../lib/utils.ts';
import { useNavigate } from 'react-router-dom';

interface MenuDropdownProps {
  setMenuOpen: (open: boolean) => void;
}

const MenuDropdown = ({ setMenuOpen }: MenuDropdownProps) => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const goSettings = () => navigate('/settings');
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={'w-[283px] h-[252px] absolute right-0 top-full mt-2 bg-white border-2 border-[#E5E5E5] rounded-3xl shadow-md z-100 font-nunito'}>
      {/* Main Container */}
      <div className={'w-[230px] mx-auto h-full flex flex-col justify-center'}>
        {/* User Information */}
        <div className={'flex items-center gap-4 mb-4'}>
          {/* User Profile Icon */}
          <div>
            <div className={'w-[66px] h-[66px] bg-[#D9D9D9] rounded-xl'}></div>
          </div>

          {/* User Name, Username, joined date */}
          <div className={'flex flex-col justify-center gap-0'}>
            {/* Name */}
            <h1 className={'font-black text-[#4B4B4B] text-lg line-clamp-1'}>
              {authUser?.fullName}
            </h1>

            {/* username */}
            <div className={'flex flex-col justify-center gap-1'}>
              <span className={'font-black text-[#4B4B4B] text-xs line-clamp-1'}>
                {authUser?.username}
              </span>
            </div>
            {/* Join Date */}
            <div>
              <span className={'font-black text-[#4B4B4B] text-xs line-clamp-1'}>
                Joined {authUser?.createdAt ? formatMonthYear(authUser.createdAt) : '?'}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons Container */}
        <div className={'flex flex-col gap-4'}>
          {/* Settings Button */}
          <div className={'flex flex-col gap-3'}>
            <button
              className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-full h-[40px] cursor-pointer'}
              onClick={() => {goSettings(); closeMenu();}}
            >
              <Settings className={'size-[20px] text-[#7D7D7D] mr-3'} />
              <span className={'text-xl font-black text-[#7D7D7D]'}>Settings</span>
            </button>
          </div>

          {/* Log Out Button */}
          <div className={'flex flex-col gap-3'}>
            <button
              className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-full h-[40px] cursor-pointer'}
              onClick={async () => {
                try {
                  await logout();
                  closeMenu();
                } catch (e) {
                  toast.error('Error logging out');
                  console.error('Logout failed', e);
                }
              }}
            >
              <LogOut className={'size-[20px] text-[#7D7D7D] mr-3'} />
              <span className={'text-xl font-black text-[#7D7D7D]'}>Sign Out</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MenuDropdown;