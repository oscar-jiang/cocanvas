import { Plus } from 'lucide-react';
import { useRoomStore } from '../../store/useRoomStore';
import { useDocumentStore } from '../../store/useDocumentStore';
import type { Document } from '../../types/Document';
import { useEffect } from 'react';

const DocumentTabs = () => {
  const { docs, createDoc, getDoc, getAllDocs, currentDoc, handleOnSave } = useDocumentStore();
  const { currentRoom } = useRoomStore();

  useEffect(() => {
    if (currentRoom) {
      getAllDocs();
    }
  }, [getAllDocs, createDoc, currentRoom]);

  const handleCreateDoc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const docName = 'Doc File ';
    const docType = 'text';
    if (currentRoom) {
      await createDoc(docName, docType, currentRoom.roomId);
    }
  };

  const handleGetDoc = async (doc: Document) => {
    await handleOnSave();
    if (doc.docId) {
      await getDoc(doc.docId);
    }
  };

  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 bg-white overflow-x-auto">
      {docs.map((doc: Document, index) => (
        <button
          key={index}
          className={`px-4 py-1.5 text-sm rounded-full  text-gray-700 hover:bg-gray-200 transition whitespace-nowrap cursor-pointer ${
            currentDoc?.docId === doc.docId ? 'bg-blue-300' : 'bg-gray-100'
          }`}
          onClick={() => handleGetDoc(doc)}
        >
          {doc.docName} {index}
        </button>
      ))}
      <button
        className="px-3 py-1.5 text-sm font-bold text-black rounded-full flex items-center gap-1 transition cursor-pointer"
        onClick={handleCreateDoc}
      >
        <Plus className="w-4 h-4" /> Add
      </button>
    </div>
  );
};

export default DocumentTabs;
