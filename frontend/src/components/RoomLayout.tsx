import DocumentEditor from './DocumentEditor';
import ChatPanel from './ChatPanel';
import TopNavigation from './Room/TopNavigation.tsx';
import DocumentTabs from './Room/DocumentTab.tsx';
import TextFormattingToolbar from './Room/TextFormattingHeader.tsx';
import Editor from './Room/Editor.tsx';

const RoomLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Navigation Bar */}
      <TopNavigation />

      {/* Document Tabs */}
      <DocumentTabs />

      {/* Formatting Toolbar */}
      <TextFormattingToolbar />

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden w-full p-4 gap-6">
        {/* Document Editor */}
        <div className="flex-1 overflow-auto">
          {/* <DocumentEditor /> */}
          <Editor />
        </div>

        {/* Chat Panel */}
        <div className="w-full sm:w-80 md:w-96 flex-shrink-0 flex flex-col h-full">
          <ChatPanel />
        </div>
      </main>
    </div>
  );
};

export default RoomLayout;
