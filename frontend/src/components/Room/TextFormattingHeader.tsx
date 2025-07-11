const TextFormattingToolbar = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-2 bg-gray-50 border-b border-gray-200 text-sm select-none">
      <button className="px-2 py-1 rounded hover:bg-gray-100 font-bold transition text-black">B</button>
      <button className="px-2 py-1 rounded hover:bg-gray-100 italic transition text-black cursor-pointer">I</button>
      <button className="px-2 py-1 rounded hover:bg-gray-100 underline transition text-black cursor-pointer">U</button>
      <button className="px-2 py-1 rounded hover:bg-gray-100 transition text-black cursor-pointer">H1</button>
      <button className="px-2 py-1 rounded hover:bg-gray-100 transition text-black cursor-pointer">H2</button>
      <button className="px-2 py-1 rounded hover:bg-gray-100 transition text-black cursor-pointer">List</button>
    </div>
  );
};

export default TextFormattingToolbar;
