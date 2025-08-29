import { Loader2, Plus } from 'lucide-react';
import { useRoomStore } from '../../store/useRoomStore.ts';
import { useDocumentStore } from '../../store/useDocumentStore.ts';
import type { Document } from '../../types/Document.ts';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const DocumentTabs = () => {
  const { docs, createDoc, getDoc, getAllDocs, currentDoc, handleOnSave, isCreatingDoc, isGettingDoc } = useDocumentStore();
  const { currentRoom } = useRoomStore();

  useEffect(() => {
    if (currentRoom) {
      getAllDocs();
    }
  }, [getAllDocs, createDoc, currentRoom]);

  const handleCreateDoc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const docName = 'Untitled Document ';
    const docType = 'text';
    if (currentRoom) {
      try {
        await createDoc(docName, docType, currentRoom.roomId);
      } catch (e) {
        toast.error('Unable to create a document.');
        console.error('Unable to create a document. ', e);
      }
    }
  };

  const handleGetDoc = async (doc: Document) => {
    await handleOnSave();
    if (doc.docId) {
      try {
        await getDoc(doc.docId);
      } catch (e) {
        toast.error('Unable to open the document');
        console.error('Unable to open the document. ', e);
      }
    }
  };

  return (
    // MAIN TAB CONTAINER
    <div>

      {/* Add Document Button & Document Tabs */}
      <div className={'flex items-center space-x-4 px-5 pt-2'}>
        {/* Add Button */}
        <button
          className={'flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#E5E5E5] hover:bg-[#C8C8C8] transition cursor-pointer'}
          onClick={handleCreateDoc}
          disabled={isCreatingDoc}
        >
          {isCreatingDoc ? (
            <>
              <Loader2 />
              <span className={'font-black text-[#4B4B4B]'}>Loading...</span>
            </>
          ) : (
            <>
              <Plus />
              <span className={'font-black text-[#4B4B4B]'}>Add</span>
            </>
          )}
        </button>

        {/* Document Tab */}
        <div className={'flex flex-wrap gap-3'}>

          {docs.map((doc: Document, index: number) => (
            <button
              key={index}
              className={`basis-1/6 flex items-center space-x-2 px-3 py-2 rounded-xl transition cursor-pointer ${
                currentDoc?.docId === doc.docId
                  ? 'bg-[#C8C8C8] hover:bg-[#A8A8A8]'
                  : 'bg-[#E5E5E5] hover:bg-[#B0B0B0]'
              }`}
              onClick={() => handleGetDoc(doc)}
              disabled={isGettingDoc}
            >
              <div>
                📄
              </div>
              <span className={'font-black text-[#4B4B4B] truncate max-w-[120px]'}>
                {doc.docName} {index}
              </span>
            </button>
          ))}

        </div>
      </div>

    </div>
  );
};

export default DocumentTabs;
