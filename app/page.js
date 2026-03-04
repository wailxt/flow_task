"use client";

import { useState } from "react";
import DashboardStats from "@/components/DashboardStats";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import TaskList from "@/components/TaskList";
import { filterTasks, sortTasks } from "@/lib/helpers";

export default function Home() {
  const [tasks, setTasks] = useState([]);
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
    <main className="min-h-screen bg-zinc-950">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="pt-6">
          <h1 className="text-4xl font-bold text-zinc-100">flow_task</h1>
          <p className="text-sm text-zinc-500 mt-1">Organize your focus.</p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats tasks={tasks} />

        {/* Task Form */}
        <TaskForm onAddTask={addTask} />

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
