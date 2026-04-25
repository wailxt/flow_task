"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialForm = { title: "", description: "", priority: "Medium", categoryId: "", dueDate: "" };

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function TaskForm({ onAddTask, categories, theme, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const isDark = theme === "dark";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const selectedCategory = categories.find((c) => c.id === Number(form.categoryId));
    onAddTask({
      id: Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      category: selectedCategory ? { name: selectedCategory.name, color: selectedCategory.color } : null,
      dueDate: form.dueDate,
      completed: false,
      createdAt: Date.now(),
    });
    setForm(initialForm);
  }

  const inputClass = `w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all
    focus:ring-2 focus:ring-indigo-500/50
    ${isDark
      ? "bg-white/[0.04] border border-white/[0.07] text-zinc-100 placeholder-zinc-600 focus:bg-white/[0.07]"
      : "bg-slate-50 border border-slate-300 text-slate-900 placeholder-gray-400 focus:bg-white focus:border-indigo-300"
    }`;

  const labelClass = `block text-xs font-semibold mb-1.5 ${isDark ? "text-zinc-400" : "text-slate-600"}`;

  const triggerClass = `w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all cursor-pointer
    focus:ring-2 focus:ring-indigo-500/50
    ${isDark
      ? "bg-white/[0.04] border border-white/[0.07] text-zinc-100 hover:bg-white/[0.07]"
      : "bg-slate-50 border border-slate-300 text-slate-900 hover:bg-white hover:border-indigo-300"
    }`;

  const selectedCategoryName = form.categoryId
    ? categories.find(c => c.id.toString() === form.categoryId.toString())?.name || "No Category"
    : "No Category";

  return (
    <div className={`rounded-2xl p-5 ${isDark ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-200 shadow-sm shadow-slate-200/50"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-semibold ${isDark ? "text-zinc-200" : "text-slate-800"}`}>New Task</h3>
        {onCancel && (
          <button onClick={onCancel} className={`text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${isDark ? "text-zinc-500 hover:text-zinc-300 hover:bg-white/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}>
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className={labelClass}>Title *</label>
          <input type="text" name="title" placeholder="Task title" value={form.title} onChange={handleChange} className={inputClass} />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" placeholder="Add a description (optional)" value={form.description} onChange={handleChange} rows={2} className={`${inputClass} resize-none`} />
        </div>

        {/* Row: Priority, Category, Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Priority */}
          <div>
            <label className={labelClass}>Priority</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className={triggerClass}>
                  <span>{form.priority}</span>
                  <ChevronIcon />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[180px]">
                <DropdownMenuRadioGroup value={form.priority} onValueChange={v => setForm({ ...form, priority: v })}>
                  <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className={triggerClass}>
                  <span className="truncate">{selectedCategoryName}</span>
                  <ChevronIcon />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuRadioGroup value={form.categoryId?.toString()} onValueChange={v => setForm({ ...form, categoryId: v })}>
                  <DropdownMenuRadioItem value="">No Category</DropdownMenuRadioItem>
                  {categories?.map(cat => (
                    <DropdownMenuRadioItem key={cat.id} value={cat.id.toString()}>{cat.name}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Due Date */}
          <div>
            <label className={labelClass}>Due Date</label>
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            Create Task
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className={`px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${isDark ? "text-zinc-400 hover:text-zinc-200 hover:bg-white/5" : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"}`}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
