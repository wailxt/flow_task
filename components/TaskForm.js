"use client";

import { useState } from "react";

const initialForm = {
    title: "",
    description: "",
    priority: "Medium",
    category: "",
    dueDate: "",
};

export default function TaskForm({ onAddTask }) {
    const [form, setForm] = useState(initialForm);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.title.trim()) return;

        const task = {
            id: Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            priority: form.priority,
            category: form.category.trim(),
            dueDate: form.dueDate,
            completed: false,
            createdAt: Date.now(),
        };

        onAddTask(task);
        setForm(initialForm);
    }

    const inputClass =
        "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors";

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4"
        >
            <h2 className="text-lg font-semibold text-zinc-200">Add New Task</h2>

            <input
                type="text"
                name="title"
                placeholder="Task title *"
                value={form.title}
                onChange={handleChange}
                className={inputClass}
            />

            <textarea
                name="description"
                placeholder="Description (optional)"
                value={form.description}
                onChange={handleChange}
                rows={2}
                className={`${inputClass} resize-none`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass}
                />

                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
            >
                Add Task
            </button>
        </form>
    );
}
