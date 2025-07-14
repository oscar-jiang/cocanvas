
import { create } from "zustand/react";
import { axiosInstance } from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type { JSONContent } from '@tiptap/core';

type DocumentStates = {
    createDoc: (docName: string, docType: string, roomId: string) => Promise<void>;
    getDoc: (docId: string, content: JSONContent) => Promise<void>;
    saveDoc: (docId: string, content: JSONContent) => Promise<void>;
};

export const useDocumentStore = create<DocumentStates>(() => ({
    createDoc: async (docName: string, docType: string, roomId: string): Promise<void> => {
        try {
            const data = {docName, docType, roomId};
            const response = await axiosInstance.post("/doc/createDoc", data);
            console.log("successfully created document", response);
            toast.success(`successfully created document`);
        } catch (e) {
            toast.error("Error creating document");
        }
    },
    getDoc: async (docId: string): Promise<void> => {
        try {
            const response = await axiosInstance.get(`/doc/getDoc/${docId}`);
            console.log("doc fetched successfully: ", response);
        } catch (e) {
            toast.error("Error getting messages");
        }
    },
    saveDoc: async (docId: string, content: JSONContent) => {
        try {
            const data = {docId, content}
            const response = await axiosInstance.post("/doc/saveDoc", data);
            toast.success(`successfully saved doc to database`);
            console.log("successfully saved document", response);
        } catch (e: Error | any) {
            toast.error("Failed to ssave doc " + e.response?.data?.error || "Unknown error");
        }
    }
}))