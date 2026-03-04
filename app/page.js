"use client";

import { useState } from "react";
import DashboardStats from "@/components/DashboardStats";
import CategoryManager from "@/components/CategoryManager";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import TaskList from "@/components/TaskList";
import { filterTasks, sortTasks } from "@/lib/helpers";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOption, setSortOption] = useState("createdAt");

  function addTask(task) {
    setTasks((prev) => [task, ...prev]);
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addCategory(category) {
    setCategories((prev) => [...prev, category]);
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  function handleFilterChange(key, value) {
    if (key === "statusFilter") setStatusFilter(value);
    if (key === "priorityFilter") setPriorityFilter(value);
    if (key === "sortOption") setSortOption(value);
  }

  const visibleTasks = sortTasks(
    filterTasks(tasks, statusFilter, priorityFilter),
    sortOption
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950 overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-indigo-600 opacity-20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-purple-600 opacity-20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-10">
        {/* Header */}
        <div className="pt-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            flow_task
          </h1>
          <p className="text-sm text-zinc-400 mt-2">Organize your focus.</p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats tasks={tasks} />

        {/* Category Manager */}
        <CategoryManager
          categories={categories}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
        />

        {/* Task Form */}
        <TaskForm onAddTask={addTask} categories={categories} />

        {/* Filter Bar */}
        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          sortOption={sortOption}
          onFilterChange={handleFilterChange}
        />

        {/* Task List */}
        <TaskList
          tasks={visibleTasks}
          totalCount={tasks.length}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
        />
      </div>
    </main>
  );
}
