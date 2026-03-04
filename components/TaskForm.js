"use client";

import { useState } from "react";

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
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className={selectClass}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="flex flex-col items-center w-full space-y-2">
                    <label className={centerLabelClass}>Category</label>
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className={selectClass}
                    >
                        <option value="">No Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
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
