"use client";

import { useState } from "react";

const PRESET_COLORS = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-green-500",
  "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500",
];

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function CategoryManager({ categories, onAddCategory, onDeleteCategory, theme }) {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[4]);
  const isDark = theme === "dark";

  function handleAdd() {
    if (!name.trim()) return;
    onAddCategory({ id: Date.now(), name: name.trim(), color: selectedColor });
    setName("");
  }

  const card = isDark
    ? "bg-white/[0.03] border border-white/[0.07]"
    : "bg-white border border-slate-300 shadow-sm shadow-slate-200/50";

  const inputClass = `flex-1 min-w-0 rounded-xl px-4 py-2 text-sm outline-none transition-all
    focus:ring-2 focus:ring-indigo-500/50
    ${isDark
      ? "bg-white/[0.04] border border-white/[0.07] text-zinc-100 placeholder-zinc-600 focus:bg-white/[0.07]"
      : "bg-slate-50 border border-slate-300 text-slate-900 placeholder-gray-400 focus:bg-white focus:border-indigo-400"
    }`;

  return (
    <div className={`rounded-2xl p-5 ${card}`}>
      <h3 className={`text-sm font-semibold mb-4 ${isDark ? "text-zinc-200" : "text-slate-800"}`}>
        Categories
      </h3>

      {/* Add form */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
          className={inputClass}
        />

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 shrink-0">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full cursor-pointer transition-all ${color}
                ${selectedColor === color ? "ring-2 ring-offset-1 ring-white/80 scale-110" : "hover:scale-105 opacity-70 hover:opacity-100"}
                ${isDark ? "ring-offset-[#0c0e14]" : "ring-offset-white"}`}
            />
          ))}
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shrink-0 shadow-md shadow-indigo-500/20"
        >
          <PlusIcon />Add
        </button>
      </div>

      {/* Category chips */}
      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={`${cat.color} text-white text-xs font-medium rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm`}
            >
              {cat.name}
              <button
                onClick={() => onDeleteCategory(cat.id)}
                className="hover:opacity-70 cursor-pointer transition-opacity"
              >
                <CloseIcon />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className={`text-xs ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
          No categories yet. Add one above.
        </p>
      )}
    </div>
  );
}
