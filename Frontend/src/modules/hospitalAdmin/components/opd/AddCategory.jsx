import { useState } from "react";
import { Plus } from "lucide-react";

const AddCategory = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex gap-3 items-center max-w-2xl w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Add new clinical category (e.g. Immunology)..."
        className="flex-1 bg-transparent px-2 py-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
      />

      <button
        onClick={handleAdd}
        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition flex items-center justify-center gap-1.5 shrink-0 active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" />
        Add Category
      </button>
    </div>
  );
};

export default AddCategory;