
import { create } from "zustand/react";
import { axiosInstance } from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type { JSONContent } from '@tiptap/core';
import type { Document } from "../types/Document.ts";
import type { Editor } from '@tiptap/core';

type DocumentStates = {
  docs: Document[],
  currentDoc: Document | null,
  editorInstance: Editor | null;
  createDoc: (docName: string, docType: string, roomId: string) => Promise<void>;
  getDoc: (docId: string) => Promise<void>;
  saveDoc: (docId: string, content: JSONContent) => Promise<void>;
  getAllDocs: () => Promise<void>;
  handleOnSave: () => Promise<void>;
};

export const useDocumentStore = create<DocumentStates>((set, get) => ({
  docs: [],
  currentDoc: null,
  editorInstance: null,
  createDoc: async (docName: string, docType: string, roomId: string): Promise<void> => {
    try {
      const data = { docName, docType, roomId };
      const response = await axiosInstance.post("/doc/createDoc", data);
      const doc = response.data;
      const { docs } = get();
      set({ docs: [...docs, doc] });
      set({ currentDoc: doc });
      // toast.success(`Successfully created a document`);
    } catch (e) {
      console.log(e)
      toast.error("Error creating document");
    }
  },
  getDoc: async (docId: string): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/doc/getDoc/${docId}`);
      set({ currentDoc: response.data });
      // toast.success(`successfully fetched doc`);
    } catch (e) {
      toast.error("Error getting documents");
    }
  },
  saveDoc: async (docId: string, content: JSONContent) => {
    try {
      const data = { docId, content }
      const response = await axiosInstance.post("/doc/saveDoc", data);
      set({ currentDoc: response.data });
      // toast.success(`successfully saved doc : ${response.data.docName} to database`); // should have different way of showing it has been saved
    } catch (e: Error | any) {
      toast.error("Failed to save doc " + e.response?.data?.error || "Unknown error");
    }
  },
  getAllDocs: async () => {
    try {
      const response = await axiosInstance.get(`/doc/getAllDocs`);
      set({ docs: response.data });
      // Set the first of Doc List to be currentDoc
      if (get().docs.length !== 0) {
        set({ currentDoc: get().docs[0] });
      }
    } catch (e: Error | any) {
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
    } catch (e : Error | any) {
      console.log(e)
      toast.error("Failed to handle saving! " + e.response?.data?.error || "Unknown error");
    }

  }
}))