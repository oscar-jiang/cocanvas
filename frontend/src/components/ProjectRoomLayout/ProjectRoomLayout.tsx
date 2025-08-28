import {
  Bold,
  CodeXml,
  DoorOpen,
  Italic,
  Link,
  MessagesSquare,
  Plus,
  Save,
  Settings2,
  Trash2,
  UsersRound,
} from 'lucide-react';
import Editor from '../Room/Editor.tsx';
import ChatPanel from './ChatPanel.tsx';
import { useNavigate } from 'react-router-dom';
import { useRoomStore } from '../../store/useRoomStore.ts';
import { truncateText } from '../../lib/utils.ts';

const ProjectRoomLayout = () => {
  const navigate = useNavigate();
  const goHome = () => navigate('/home');
  const { currentRoom: room } = useRoomStore();

  return (
    // PRIMARY CONTAINER
    <div className={'font-nunito'}>

      {/* Header */}
      <div className={'h-[171px] border-b-2 border-[#E5E5E5]'}>

        {/* Main Container */}
        <div className={'max-w-[1440px] mx-auto'}>
          {/* Icon and Project Name & Collaborators, Settings, and Home buttons */}
          <div className={'flex items-center justify-between w-full p-5 max'}>
            {/* Icon and Project Name */}
            <div className={'flex items-center space-x-6'}>
              {/* Icon */}
              <div className={'text-5xl p-0'}>
                🤹‍♂️
              </div>

              <h2 className={'text-[#4B4B4B] font-black text-2xl  mt-2 p-0 leading-tight line-clamp-2'}>
                {truncateText(room?.roomName ?? '', 50)}
              </h2>
            </div>

            {/* Collaborators, Settings, and Home buttons */}
            <div className={'flex items-center space-x-6'}>
              {/* Collaborators */}
              <button className={'flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition'}>
                <UsersRound className={'text-[#4B4B4B]'} />
                <span className={'font-black text-[#4B4B4B]'}>Collaborators</span>
              </button>

              {/* Settings */}
              <button className={'flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition'}>
                <Settings2 className={'text-[#4B4B4B]'} />
                <span className={'font-black text-[#4B4B4B]'}>Settings</span>
              </button>

              {/* Exit */}
              <button
                className={'flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition'}
                onClick={goHome}
              >
                <DoorOpen className={'text-[#4B4B4B]'} />
                <span className={'font-black text-[#4B4B4B]'}>Exit</span>
              </button>
            </div>
          </div>

          {/* Add Document Button & Document Tabs */}
          <div className={'flex items-center space-x-4 px-5 pt-2'}>
            {/* Add Button */}
            <button className={'flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#E5E5E5] hover:bg-[#C8C8C8] transition'}>
              <Plus />
              <span className={'font-black text-[#4B4B4B]'}>Add</span>
            </button>

            {/* Document Tab */}
            <div className={'flex items-center space-x-3 overflow-x-auto'}>
              <button className={'flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#E5E5E5] hover:bg-[#C8C8C8] transition'}>
                <div>📄</div>
                <span className={'font-black text-[#4B4B4B]'}>Untitled Document</span>
              </button>

              <button className={'flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#E5E5E5] hover:bg-[#C8C8C8] transition'}>
                <div>📄</div>
                <span className={'font-black text-[#4B4B4B]'}>Untitled Document</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor & Document Container */}
      <div className={'max-w-[1440px] mx-auto'}>
        {/* Header (document name & toolbar on left; open/close chat button on right; should be flex or something ) */}
        <div>
          <div className={'flex justify-between w-full p-5 max'}>
            {/* DocNameNSaveDel Container */}
            <div className={'flex items-center'}>
              {/* Document Icon & Name */}
              <div className={'flex items-center space-x-6'}>
                {/* Icon */}
                <div className={'text-5xl p-0'}>
                  📚
                </div>

                <h2 className={'text-[#7D7D7D] font-black text-2xl mt-2 p-0 leading-tight line-clamp-2'}>
                  Untitled Document
                </h2>
              </div>

              {/* Save & Delete Buttons */}
              <div className={'flex space-x-4 ml-14'}>
                <button className={'size-[48px] bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}>
                  <Save className={'size-[30px] text-[#7D7D7D]'} />
                </button>

                <button
                  className={'size-[48px] bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}>
                  <Trash2 className={'size-[30px] text-[#7D7D7D]'} />
                </button>
              </div>
            </div>

            {/* Collapse Chat */}
            <div>
              <button
                className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}
              >
                <MessagesSquare className={'size-[30px] text-[#7D7D7D] mr-5'} />
                <span className={'text-3xl font-black text-[#7D7D7D]'}>Chat</span>
              </button>
            </div>
          </div>

          {/* Tool Bar */}
          <div className={'flex items-center space-x-3 mb-5 ml-5 mx-auto'}>
            <button
              className={'px-2 py-1 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}>
              <Bold className={'text-[#7D7D7D]'} />
              <span className={'text-sm font-black text-[#7D7D7D]'}>Bold</span>
            </button>

            <button
              className={'px-2 py-1 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}>
              <Italic className={'text-[#7D7D7D]'} />
              <span className={'text-sm font-black text-[#7D7D7D]'}>Italic</span>
            </button>

            <button
              className={'px-2 py-1 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}>
              <Link className={'text-[#7D7D7D]'} />
              <span className={'text-sm font-black text-[#7D7D7D]'}>Link</span>
            </button>

            <button
              className={'px-2 py-1 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}>
              <CodeXml className={'text-[#7D7D7D]'} />
              <span className={'text-sm font-black text-[#7D7D7D]'}>Code</span>
            </button>
          </div>
        </div>

        {/* Editor & Chat Box */}
        <div className={'flex w-full h-[calc(100vh-171px-100px)] px-5 pb-5 gap-5'}>
          <div className={'flex-1 bg-white rounded-xl border-2 border-[#E5E5E5] overflow-hidden'}>
            <Editor />
          </div>

          <div className={'w-[400px] bg-[#F9F9F9] rounded-xl border-2 border-[#E5E5E5] overflow-hidden'}>
            <ChatPanel />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectRoomLayout;