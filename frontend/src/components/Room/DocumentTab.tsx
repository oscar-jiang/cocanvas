import {Plus} from "lucide-react";
import Editor from "./Editor";


const DocumentTabs = () => {
  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 bg-white overflow-x-auto">
      {["Example", "Example", "Example"].map((doc, index) => (
        <button
          key={index}
          className="px-4 py-1.5 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition whitespace-nowrap cursor-pointer"
        >
          {doc}
        </button>
      ))}
      <button className="px-3 py-1.5 text-sm font-bold text-black rounded-full flex items-center gap-1 transition cursor-pointer">
        <Plus className="w-4 h-4" /> Add
      </button>
    </div>

  );
};

export default DocumentTabs;
