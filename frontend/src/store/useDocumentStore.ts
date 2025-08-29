
import { create } from "zustand/react";
import { axiosInstance } from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type { JSONContent } from '@tiptap/core';
import type { Document } from "../types/Document.ts";
import type { Editor } from '@tiptap/core';
import {useRoomStore} from "./useRoomStore.ts";

type DocumentStates = {
  docs: Document[],
  currentDoc: Document | null,
  editorInstance: Editor | null;

  isCreatingDoc: boolean;

  createDoc: (docName: string, docType: string, roomId: string) => Promise<void>;

  isGettingDoc: boolean;

  getDoc: (docId: string) => Promise<void>;

  isSavingDoc: boolean;

  saveDoc: (docId: string, content: JSONContent) => Promise<void>;
  getAllDocs: () => Promise<void>;
  handleOnSave: () => Promise<void>;

  isDeletingDoc: boolean;
  deleteDoc: (docId: string) => Promise<void>;
  handleOnDelete: () => Promise<void>;

  isEditingDoc: boolean;
  editDoc: (data: { docName: string, documentIcon: string } ,docId: string) => Promise<void>;
};

export const useDocumentStore = create<DocumentStates>((set, get) => ({
  docs: [],
  currentDoc: null,
  editorInstance: null,

  isCreatingDoc: false,
  createDoc: async (docName: string, docType: string, roomId: string): Promise<void> => {
    set({ isCreatingDoc: true });
    try {
      const data = { docName, docType, roomId };
      const response = await axiosInstance.post(`/doc/${roomId}/createDoc`, data);
      const doc = response.data;
      const { docs } = get();
      set({ docs: [...docs, doc] });
      set({ currentDoc: doc });
      // toast.success(`Successfully created a document`);
    } catch (e) {
      console.log(e)
      toast.error("Error creating document");
    } finally {
      set({ isCreatingDoc: false });
    }
  },

  isGettingDoc: false,
  getDoc: async (docId: string): Promise<void> => {
    set({ isGettingDoc: true });
    try {
      const roomId = useRoomStore.getState().currentRoom?.roomId;
      const response = await axiosInstance.get(`/doc/${roomId}/getDoc/${docId}`);
      set({ currentDoc: response.data });
      // toast.success(`successfully fetched doc`);
    } catch (e) {
      toast.error("Error getting documents");
    } finally {
      set({ isGettingDoc: false });
    }
  },

  isSavingDoc: false,
  saveDoc: async (docId: string, content: JSONContent) => {
    set({ isSavingDoc: true });
    try {
      const data = { docId, content }
      const roomId = useRoomStore.getState().currentRoom?.roomId;
      const response = await axiosInstance.post(`/doc/${roomId}/saveDoc`, data);
      set({ currentDoc: response.data });
      // toast.success(`successfully saved doc : ${response.data.docName} to database`); // should have different way of showing it has been saved
    } catch (e: Error | any) {
      toast.error("Failed to save doc " + e.response?.data?.error || "Unknown error");
    } finally {
      set({ isSavingDoc: false });
    }
  },
  getAllDocs: async () => {
    try {
      const roomId = useRoomStore.getState().currentRoom?.roomId;
      const response = await axiosInstance.get(`/doc/${roomId}/getAllDocs`);
      set({ docs: response.data });
      // Set the first of Doc List to be currentDoc
      if (get().docs.length !== 0) {
        set({ currentDoc: get().docs[0] });
      }
    } catch (e : Error | any) {
      toast.error("Failed to fetch all docs in room " + e.response?.data?.error || "Unknown error");
    }
  },
  handleOnSave: async () => {
    try {
      const editor = get().editorInstance;
      const docId = get().currentDoc?.docId;
      if (editor?.getJSON() && docId) {
        await get().saveDoc(docId, editor.getJSON());
      }
      toast.success("Saved document");
    } catch (e : Error | any) {
      console.log(e)
      toast.error("Failed to handle saving! " + e.response?.data?.error || "Unknown error");
    }
  },

  isDeletingDoc: false,
  deleteDoc: async (docId: string) => {
    set({ isDeletingDoc: true });
    try {
      const roomId = useRoomStore.getState().currentRoom?.roomId;
      await axiosInstance.delete(`/doc/${roomId}/deleteDoc/${docId}`);

      const { docs, currentDoc } = get();
      const updatedDocs = docs.filter((doc) => doc.docId !== docId);

      set({ docs: updatedDocs });

      if (currentDoc?.docId === docId) {
        set({ currentDoc: updatedDocs.length > 0 ? updatedDocs[0] : null });
      }
    } catch (e : Error | any) {
      console.log(e)
      toast.error("Failed to delete document! " + e.response?.data?.error || "Unknown error");
    } finally {
      set({ isDeletingDoc: false });
    }
  },

  handleOnDelete: async () => {
    try {
      const docId = get().currentDoc?.docId ?? '';
      await get().deleteDoc(docId);

      toast.success("Successfully deleted!");
    } catch (e : Error | any) {
      console.log(e)
      toast.error("Failed to handle deleting! " + e.response?.data?.error || "Unknown error");
    }
  },

  isEditingDoc: false,
  editDoc: async (data, docId : string) => {
    set({ isEditingDoc: true });
    try {
      const roomId = useRoomStore.getState().currentRoom?.roomId;

      const response = await axiosInstance.put(`/doc/${roomId}/updateDoc/${docId}`, data);

      set({ currentDoc: response.data });

      // Update the docs array
      set((state) => ({
        docs: state.docs.map((doc) =>
          doc.docId === response.data.docId ? response.data : doc
        ),
      }));

      toast.success("Successfully updated the document");
    } catch (e : Error | any) {
      console.log(e)
      toast.error("Failed to update document! " + e.response?.data?.error || "Unknown error");
    } finally {
      set({ isEditingDoc: false });
    }
  }
}))