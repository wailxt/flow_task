"use client";

import { useState } from "react";

const initialForm = {
    title: "",
    description: "",
    priority: "Medium",
    categoryId: "",
    dueDate: "",
};

export default function TaskForm({ onAddTask, categories }) {
    const [form, setForm] = useState(initialForm);

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
            category: selectedCategory ? { name: selectedCategory.name, color: selectedCategory.color } : null,
            dueDate: form.dueDate,
            completed: false,
            createdAt: Date.now(),
        };

        onAddTask(task);
        setForm(initialForm);
    }

    const inputClass =
        "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors";

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-6 space-y-4"
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

                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="">No Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

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
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
            >
                Add Task
            </button>
        </form>
    );
}
