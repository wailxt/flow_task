"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ChevronIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

const initialForm = {
    title: "",
    description: "",
    priority: "Medium",
    categoryId: "",
    dueDate: "",
};

export default function TaskForm({ onAddTask, categories, theme }) {
    const [form, setForm] = useState(initialForm);
    const isDark = theme === "dark";

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.title.trim()) return;

        const selectedCategory = categories.find(
            (c) => c.id === Number(form.categoryId)
        );

        const task = {
            id: Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            priority: form.priority,
            category: selectedCategory
                ? { name: selectedCategory.name, color: selectedCategory.color }
                : null,
            dueDate: form.dueDate,
            completed: false,
            createdAt: Date.now(),
        };

        onAddTask(task);
        setForm(initialForm);
    }

    const inputClass = `w-full rounded-lg px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark
        ? "bg-white/5 border border-white/10 text-zinc-100 placeholder-zinc-500"
        : "bg-white border border-gray-300 text-gray-800 placeholder-gray-400"
        }`;

    const selectClass = `w-full appearance-none rounded-lg px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark
        ? "bg-white/5 border border-white/10 text-white"
        : "bg-white border border-gray-300 text-gray-800"
        }`;

    const baseLabelClass = `text-xs uppercase tracking-wide ${isDark ? "text-zinc-400" : "text-gray-500"}`;
    const leftLabelClass = `block mb-1 ${baseLabelClass}`;
    const centerLabelClass = `block mb-2 text-center ${baseLabelClass}`;

    return (
        <form
            onSubmit={handleSubmit}
            className={`backdrop-blur-md rounded-xl p-6 space-y-4 ${isDark
                ? "bg-white/5 border border-white/10 shadow-lg"
                : "bg-white border border-gray-200 shadow-md"
                }`}
        >
            <h2 className={`text-lg font-semibold ${isDark ? "text-zinc-200" : "text-gray-800"}`}>
                Add New Task
            </h2>

            <div className="space-y-2">
                <label className={leftLabelClass}>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Task title *"
                    value={form.title}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>

            <div className="space-y-2">
                <label className={leftLabelClass}>Description</label>
                <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    className={`${inputClass} resize-none`}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center w-full space-y-2">
                    <label className={centerLabelClass}>Priority</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={`${selectClass} w-full text-left relative pr-10`} type="button">
                                <span className="block truncate">{form.priority}</span>
                                <ChevronIcon />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[8rem]">
                            <DropdownMenuRadioGroup 
                                value={form.priority} 
                                onValueChange={(val) => setForm({ ...form, priority: val })}
                            >
                                <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex flex-col items-center w-full space-y-2">
                    <label className={centerLabelClass}>Category</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={`${selectClass} w-full text-left relative pr-10`} type="button">
                                <span className="block truncate">
                                    {form.categoryId 
                                        ? categories?.find(c => c.id.toString() === form.categoryId?.toString())?.name || "Unknown Category"
                                        : "No Category"}
                                </span>
                                <ChevronIcon />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[8rem]">
                            <DropdownMenuRadioGroup 
                                value={form.categoryId?.toString()} 
                                onValueChange={(val) => setForm({ ...form, categoryId: val })}
                            >
                                <DropdownMenuRadioItem value="">No Category</DropdownMenuRadioItem>
                                {categories?.map((cat) => (
                                    <DropdownMenuRadioItem key={cat.id} value={cat.id.toString()}>
                                        {cat.name}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex flex-col items-center w-full space-y-2">
                    <label className={centerLabelClass}>Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
            >
                Add Task
            </button>
        </form>
    );
}
