"use client";

import { useState } from "react";

const PRESET_COLORS = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
];

function CloseIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function TagIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
    );
}

export default function CategoryManager({ categories, onAddCategory, onDeleteCategory }) {
    const [name, setName] = useState("");
    const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[4]);

    function handleAdd() {
        if (!name.trim()) return;
        onAddCategory({
            id: Date.now(),
            name: name.trim(),
            color: selectedColor,
        });
        setName("");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    }

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-zinc-400">
                <TagIcon />
                <h2 className="text-lg font-semibold text-zinc-200">Categories</h2>
            </div>

            <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[180px]">
                    <input
                        type="text"
                        placeholder="Category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>

                <div className="flex items-center gap-1.5">
                    {PRESET_COLORS.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-6 h-6 rounded-full ${color} cursor-pointer transition-all ${selectedColor === color ? "ring-2 ring-white scale-110" : "ring-1 ring-white/20 hover:scale-105"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleAdd}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                    Add
                </button>
            </div>

            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {categories.map((cat) => (
                        <span
                            key={cat.id}
                            className={`${cat.color} text-white text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1.5`}
                        >
                            {cat.name}
                            <button
                                onClick={() => onDeleteCategory(cat.id)}
                                className="hover:opacity-70 cursor-pointer"
                            >
                                <CloseIcon />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
