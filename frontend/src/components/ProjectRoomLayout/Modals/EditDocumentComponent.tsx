import { useModalStore } from '../../../store/useModalStore.ts';
import React, { useEffect, useState } from 'react';
import { Loader2, PencilLine, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { emojiCategories } from '../../../lib/utils.ts';
import { useDocumentStore } from '../../../store/useDocumentStore.ts';

const EditDocumentComponent = () => {
  const { isEditDocOpen, closeEditDoc } = useModalStore();
  const [formData, setFormData] = useState({
    docName: '',
    documentIcon: '',
  });
  const { currentDoc, isEditingDoc, editDoc } = useDocumentStore();

  useEffect(() => {
    if (currentDoc) {
      setFormData({
        docName: currentDoc.docName || '',
        documentIcon: currentDoc.documentIcon || '',
      });
    }
  }, [currentDoc]);

  useEffect(() => {
    if (isEditDocOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Reset on unmount just in case
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEditDocOpen]);

  const validateRoomEdit = (): string | boolean => {
    // Prevent background scroll when modal is open

    const name = formData.docName.trim();
    const nameLength = formData.docName.length;

    if (!name || name === '') {
      return toast.error('Project name is required');
    }

    if (nameLength > 56) {
      return toast.error('Project name is too long');
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid: string | boolean = validateRoomEdit();
    if (isValid === true) {
      try {
         await editDoc(formData, currentDoc?.docId ?? '');

        // Close the modal
        closeEditDoc();
      } catch (e) {
        console.error('Project edit failed', e);
        toast.error('Project edit failed');
      }
    }
  };

  if (!isEditDocOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black w-full">

      {/* CREATE ROOM FORM CONTAINER */}
      <div className={'relative font-nunito w-[377px] bg-white border-2 border-[#E5E5E5] rounded-3xl'} id="inviteModal">
        {/* Absolute in the top right corner */}
        <div
          className={'absolute top-5 right-5 cursor-pointer text-[#7D7D7D]'}
          onClick={() => closeEditDoc()}
        >
          <X />
        </div>

        {/* BODY CONTAINER */}
        <div className={'flex flex-col items-center w-full h-full gap-6 p-6 bg-white rounded-2xl'}>
          {/* Title */}
          <h1 className={'font-black text-2xl text-[#4B4B4B]'}>
            Edit Project Details
          </h1>

          {/* Form Main Container */}
          <div className={'flex flex-col items-center w-full max-w-md mx-auto gap-6'}>
            <form onSubmit={handleSubmit} className={'flex flex-col w-full gap-4'}>
              {/* doc Icon */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-black text-[#7D7D7D] mb-1'}>Document Icon</label>
                <div className="max-h-60 overflow-y-auto p-2 border-2 border-[#D8D8D8] rounded-xl bg-[#F7F7F7] space-y-4">
                  {emojiCategories.map((category, catIndex) => (
                    <div key={catIndex}>
                      {/* Category label */}
                      <h3 className="text-xs font-semibold text-[#7D7D7D] mb-1">{category.label}</h3>

                      {/* Emoji grid */}
                      <div className="grid grid-cols-6 gap-2">
                        {category.emojis.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`text-2xl p-1 rounded hover:bg-gray-200 transition-all ${
                              formData.documentIcon === emoji ? "bg-gray-300" : ""
                            }`}
                            onClick={() => setFormData({ ...formData, documentIcon: emoji })}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* doc name Container */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-black text-[#7D7D7D] mb-1'}>Document Name</label>
                <input
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder="Enter Document Name"
                  type={"text"}
                  value={formData.docName}
                  onChange={(e) => setFormData({ ...formData, docName: e.target.value })}
                  required
                />
              </div>

              {/* Update Doc Button */}
              <div className={'flex items-center justify-center'}>
                <button
                  className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-[188px] h-[40px] cursor-pointer'}
                  type="submit"
                  disabled={isEditingDoc}
                >
                  {isEditingDoc ? (
                    <>
                      <Loader2 className={'size-[20px] text-[#7D7D7D] mr-3'} />
                      <span className={'text-sm font-black text-[#7D7D7D]'}>Updating...</span>
                    </>
                  ) : (
                    <>
                      <PencilLine className={'size-[20px] text-[#7D7D7D] mr-3'} />
                      <span className={'text-xs font-black text-[#7D7D7D]'}>Update Document</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

export default EditDocumentComponent;
