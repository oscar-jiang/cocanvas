import ChatPanel from './ChatPanel.tsx';
import TopNavigation from './TopNavigation.tsx';
import DocumentTabs from './DocumentTab.tsx';
import Editor from './Editor.tsx';

const RoomLayout = () => {
  
  return (
    <>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Top Navigation Bar */}
        <TopNavigation />

        {/* Document Tabs */}
        <DocumentTabs />

        {/* Main Content */}
        <main className="flex flex-1 overflow-hidden w-full p-4 gap-6">
          {/* Document Editor */}
          <div className="flex-1 overflow-auto">
            <Editor />
          </div>

          {/* Chat Panel */}
          <div className="w-full sm:w-80 md:w-96 flex-shrink-0 flex flex-col h-full">
            <ChatPanel />
          </div>
        </main>
      </div>
    </>
  );
};

export default RoomLayout;
