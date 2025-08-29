import {
  Bold,
  CodeXml,
  DoorOpen, Ellipsis,
  Italic,
  Link, Loader2,
  MessagesSquare,
  Save,
  Settings2,
  Trash2,
  UsersRound,
} from 'lucide-react';
import Editor from './Editor/Editor.tsx';
import ChatPanel from './ChatPanel.tsx';
import { useNavigate } from 'react-router-dom';
import { useRoomStore } from '../../store/useRoomStore.ts';
import { truncateText } from '../../lib/utils.ts';
import DocumentTabs from './DocumentTab.tsx';
import { useDocumentStore } from '../../store/useDocumentStore.ts';
import { useState } from 'react';
import { useModalStore } from '../../store/useModalStore.ts';

const ProjectRoomLayout = () => {
  const navigate = useNavigate();
  const goHome = () => navigate('/home');
  const { currentRoom: room } = useRoomStore();
  const { currentDoc, isGettingDoc, handleOnSave, isSavingDoc, isDeletingDoc, handleOnDelete } = useDocumentStore();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const { openEditRoom, openEditDoc } = useModalStore();

  return (
    // PRIMARY CONTAINER
    <div className={'font-nunito'}>

      {/* Header */}
      <div className={'h-auto border-b-2 border-[#E5E5E5] pb-8'}>

        {/* Main Container */}
        <div className={'max-w-[1440px] mx-auto'}>
          {/* Icon and Project Name & Collaborators, Settings, and Home buttons */}
          <div className={'flex items-center justify-between w-full p-5 max'}>
            {/* Icon and Project Name */}
            <div className={'flex items-center space-x-6'}>
              {/* Icon */}
              <div className={'text-5xl p-0'}>
                {room?.roomIcon ? room.roomIcon : '🚀'}
              </div>

              {/* Room name and description */}
              <div className={'flex flex-col space-y-0 max-w-[720px]'}>
                <h2 className={'text-[#4B4B4B] font-black text-2xl  mt-2 p-0 leading-tight line-clamp-2'}>
                  {truncateText(room?.roomName ?? '', 50)}
                </h2>

                <p className={'text-[#4B4B4B] font-semibold text-sm  mt-2 p-0 leading-tight line-clamp-2'}>
                  {room?.description}
                </p>
              </div>

            </div>

            {/* Collaborators, Settings, and Home buttons */}
            <div className={'flex items-center space-x-6'}>
              {/* Collaborators */}
              <button className={'flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition'}>
                <UsersRound className={'text-[#4B4B4B]'} />
                <span className={'font-black text-[#4B4B4B]'}>Collaborators</span>
              </button>

              {/* Settings */}
              <button
                className={'flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition'}
                onClick={() => openEditRoom()}
              >
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

          {/* DOCUMENT TABS */}
          <DocumentTabs />

        </div>
      </div>

      {/* Editor & Document Container */}
      <div className={'max-w-[1440px] mx-auto'}>
        {/* Header (document name & toolbar on left; open/close chat button on right; should be flex or something ) */}
        <div>
          <div className={'flex justify-between w-full p-5 max'}>

            {currentDoc ? (
              <>
                {/* DocNameNSaveDel Container */}
                <div className={'flex items-center'}>
                  {/* Document Icon & Name */}
                  <div className={'flex items-center space-x-6'}>
                    {/* Icon */}
                    <div className={'text-5xl p-0'}>
                      {currentDoc.documentIcon ? currentDoc.documentIcon : '📄'}
                    </div>

                    <h2 className={'text-[#7D7D7D] font-black text-2xl mt-2 p-0 leading-tight line-clamp-2'}>
                      {truncateText(currentDoc?.docName ?? '', 250)}
                    </h2>
                  </div>

                  {/* Save & Delete Buttons */}
                  <div className={'flex space-x-4 ml-14'}>
                    {/* Save button */}
                    <button
                      className={'size-[48px] bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}
                      onClick={handleOnSave}
                      disabled={isSavingDoc}
                    >
                      {isSavingDoc ? (
                        <Loader2 className={'size-[30px] text-[#7D7D7D]'} />
                      ) : (
                        <Save className={'size-[30px] text-[#7D7D7D]'} />
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      className={'size-[48px] bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}
                      onClick={handleOnDelete}
                      disabled={isDeletingDoc}
                    >
                      {isDeletingDoc ? (
                        <Loader2 className={'size-[30px] text-[#7D7D7D]'} />
                      ) : (
                        <Trash2 className={'size-[30px] text-[#7D7D7D]'} />
                      )}
                    </button>

                    {/* Document Settings Button */}
                    <button
                      className={'size-[48px] bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}
                      onClick={openEditDoc}
                    >
                      <Ellipsis className={'size-[30px] text-[#7D7D7D]'} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <h2 className={'text-[#7D7D7D] font-black text-2xl mt-2 p-0 leading-tight line-clamp-2'}>
                No File Chosen
              </h2>
            )}


            {/* Collapse Chat */}
            <div>
              <button
                className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1]'}
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                <MessagesSquare className={'text-[#7D7D7D] mr-5'} />
                <span className={'text-xl font-black text-[#7D7D7D]'}>
                  {isChatOpen ? 'Close Chat' : 'Open Chat'}
                </span>
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
            {isGettingDoc ? (
              <>
                <div className={'flex items-center justify-center h-full'}>
                  <Loader2 />
                </div>
              </>
            ) : (
              <>
                <Editor />
              </>
            )}
          </div>

          {/* Chat Component */}
          <div className={`transition-all duration-100 bg-[#F9F9F9] rounded-xl border-2 border-[#E5E5E5] overflow-hidden 
          ${isChatOpen ? 'w-[400px]' : 'w-0'}`}
          >
            {isChatOpen && <ChatPanel />}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectRoomLayout;