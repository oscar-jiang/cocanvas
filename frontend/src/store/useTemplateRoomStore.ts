import { create } from 'zustand';
import type { TemplateRoom } from '../types/TemplateRoom.ts';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/Axios.ts';

type TemplateRoomStore = {
  templates: TemplateRoom[];
  isGettingTemplates: boolean;
  getTemplates: () => Promise<void>;
  createTemplate: () => Promise<void>;
};

export const useTemplateRoomStore = create<TemplateRoomStore>((set) => ({
  templates: [],
  isGettingTemplates: false,
  getTemplates: async () => {
    set({isGettingTemplates: true});
    try {
      const response = await axiosInstance.get(`/template/all`);
      set({templates: response.data});
    } catch (e) {
      console.log("Error in getting templates: " + e);
      toast.error("Something went wrong getting templates.");
    } finally {
      set({isGettingTemplates: false});
    }
  },

  createTemplate: async () => {
    try {
      // change this and add a button or something to call this function to put a template into the database
      const newTemplate = {
        "roomName": "Data Analysis",
        "description": "Template for a Python data analysis project",
        "roomIcon": "📊",
        "documents": [
          {
            "docType": "text",
            "docName": "Introduction",
            "documentIcon": "📝",
            "content": {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This project is set up for exploring datasets and running analysis with Python."}]}]}
          },
          {
            "docType": "code",
            "docName": "analysis.py",
            "documentIcon": "🐍",
            "content": {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"# Import libraries and start your analysis"}]}]}
          },
          {
            "docType": "code",
            "docName": "data.csv",
            "documentIcon": "📊",
            "content": {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"# Sample dataset content"}]}]}
          }
        ]
      };

      const response = await axiosInstance.post('/template/create', newTemplate);

      console.log("Created template:", response.data);
      toast.success('Template created successfully.');
    } catch (e) {
      toast.error("Templated to be created.");
      console.error("Error creating template:", e);
    }
  },
}));


