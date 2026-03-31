"use client";

import { useState, useEffect } from "react";
import useTasks from "@/lib/useTasks";
import BrandHeader from "@/components/BrandHeader";
import ThemeToggle from "@/components/ThemeToggle";
import DashboardStats from "@/components/DashboardStats";
import CategoryManager from "@/components/CategoryManager";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [toast, setToast] = useState(null);

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("flowtask_theme");
    if (saved) setTheme(saved);
  }, []);

  // Sync .dark class on <html> so Shadcn CSS variables respond to theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Auto-hide toast after 2.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("flowtask_theme", next);
  }

  const {
    tasks,
    categories,
    visibleTasks,
    statusFilter,
    priorityFilter,
    sortOption,
    searchQuery,
    setSearchQuery,
    addTask,
    toggleComplete,
    deleteTask,
    addCategory,
    deleteCategory,
    handleFilterChange,
  } = useTasks();

  function handleAddTask(task) {
    addTask(task);
    setToast("Task created successfully");
  }

  const isDark = theme === "dark";

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${isDark
          ? "bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950"
          : "bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-100"
        }`}
    >
      {/* Background glow effects (dark only) */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-indigo-600 opacity-20 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-purple-600 opacity-20 blur-3xl rounded-full" />
        </>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-[toastIn_0.3s_ease-out]">
          {toast}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-10">
        <BrandHeader>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </BrandHeader>

        <DashboardStats tasks={tasks} theme={theme} />

        <CategoryManager
          categories={categories}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
          theme={theme}
        />

        <TaskForm
          onAddTask={handleAddTask}
          categories={categories}
          theme={theme}
        />

        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          sortOption={sortOption}
          onFilterChange={handleFilterChange}
          theme={theme}
        />

        <SearchBar
          query={searchQuery}
          onChange={setSearchQuery}
          theme={theme}
        />

        <TaskList
          tasks={visibleTasks}
          totalCount={tasks.length}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          theme={theme}
        />
      </div>
    </main>
  );
}
