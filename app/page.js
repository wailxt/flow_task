"use client";

import { useState, useEffect } from "react";
import useTasks from "@/lib/useTasks";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import CategoryManager from "@/components/CategoryManager";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import TaskList from "@/components/TaskList";
import { calculateProgress } from "@/lib/helpers";

// ── Icons ────────────────────────────────────────────────────────────────────
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function BarChartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

// ── Upcoming deadlines widget ─────────────────────────────────────────────────
function UpcomingDeadlinesPanel({ tasks, isDark }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = tasks
    .filter(t => !t.completed && t.dueDate)
    .map(t => ({ ...t, due: new Date(t.dueDate + "T00:00:00") }))
    .sort((a, b) => a.due - b.due)
    .slice(0, 5);

  const getDiff = (due) => {
    const diff = Math.ceil((due - today) / 86400000);
    if (diff < 0) return { label: "Overdue", cls: "text-red-400 bg-red-500/10" };
    if (diff === 0) return { label: "Today", cls: "text-amber-400 bg-amber-500/10" };
    if (diff === 1) return { label: "Tomorrow", cls: "text-indigo-400 bg-indigo-500/10" };
    return { label: `${diff}d`, cls: isDark ? "text-zinc-400 bg-white/5" : "text-slate-600 bg-slate-100" };
  };

  return (
    <div className={`rounded-2xl p-5 h-full ${isDark ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-300 shadow-md shadow-slate-200/50"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold text-sm ${isDark ? "text-zinc-200" : "text-slate-800"}`}>Upcoming Deadlines</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDark ? "bg-white/5 text-zinc-400" : "bg-slate-100 text-slate-600"}`}>{upcoming.length}</span>
      </div>
      {upcoming.length === 0 ? (
        <p className={`text-sm text-center py-6 ${isDark ? "text-zinc-600" : "text-slate-500"}`}>No upcoming deadlines 🎉</p>
      ) : (
        <div className="space-y-2.5">
          {upcoming.map(task => {
            const { label, cls } = getDiff(task.due);
            return (
              <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? "bg-white/[0.03] hover:bg-white/[0.06]" : "bg-slate-50 hover:bg-slate-100"} transition-colors`}>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDark ? "text-zinc-200" : "text-slate-800"}`}>{task.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <ClockIcon />
                    <span className={`text-xs ${isDark ? "text-zinc-500" : "text-slate-500"}`}>{task.dueDate}</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${cls}`}>{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Analytics page placeholder ────────────────────────────────────────────────
function AnalyticsPage({ tasks, isDark }) {
  const progress = calculateProgress(tasks);
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const high = tasks.filter(t => t.priority === "High" && !t.completed).length;
  const medium = tasks.filter(t => t.priority === "Medium" && !t.completed).length;
  const low = tasks.filter(t => t.priority === "Low" && !t.completed).length;

  const bars = [
    { label: "Completed", value: completed, total, color: "bg-emerald-500" },
    { label: "Pending", value: pending, total, color: "bg-indigo-500" },
    { label: "High Priority", value: high, total, color: "bg-red-500" },
    { label: "Medium Priority", value: medium, total, color: "bg-amber-500" },
    { label: "Low Priority", value: low, total, color: "bg-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Analytics</h2>
        <p className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-600"}`}>Your productivity overview</p>
      </div>

      <div className={`rounded-2xl p-6 ${isDark ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-300 shadow-md shadow-slate-200/50"}`}>
        <div className="flex items-center justify-between mb-3">
          <p className={`text-sm font-medium ${isDark ? "text-zinc-400" : "text-slate-600"}`}>Overall Progress</p>
          <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{progress}%</p>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-slate-100"}`}>
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <p className={`text-xs mt-2 ${isDark ? "text-zinc-600" : "text-slate-500"}`}>{completed} of {total} tasks completed</p>
      </div>

      <div className="space-y-4">
        {bars.map(bar => (
          <div key={bar.label} className={`rounded-2xl p-5 ${isDark ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-300 shadow-md shadow-slate-200/50"}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-slate-800"}`}>{bar.label}</p>
              <p className={`text-sm font-bold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>{bar.value}</p>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-slate-100"}`}>
              <div className={`h-full rounded-full ${bar.color} transition-all duration-700`} style={{ width: `${bar.total > 0 ? Math.round((bar.value / bar.total) * 100) : 0}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Focus page ────────────────────────────────────────────────────────────────
function FocusPage({ isDark }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const progress = 1 - seconds / (25 * 60);

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Focus Mode</h2>
        <p className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-600"}`}>Stay in the zone. No distractions.</p>
      </div>
      <div className={`rounded-2xl p-10 flex flex-col items-center justify-center gap-8 ${isDark ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-300 shadow-md shadow-slate-200/50"}`}>
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke={isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6"} strokeWidth="8" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="url(#grad)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44 * progress} ${2 * Math.PI * 44 * (1 - progress)}`} />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold tabular-nums ${isDark ? "text-white" : "text-slate-900"}`}>{mins}:{secs}</span>
            <span className={`text-xs mt-1 ${isDark ? "text-zinc-500" : "text-slate-500"}`}>Pomodoro</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setRunning(r => !r)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 cursor-pointer">
            {running ? "Pause" : "Start"}
          </button>
          <button onClick={() => { setRunning(false); setSeconds(25 * 60); }}
            className={`px-5 py-3 rounded-xl font-medium text-sm cursor-pointer ${isDark ? "bg-white/5 text-zinc-400 hover:bg-white/10" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Settings page ─────────────────────────────────────────────────────────────
function SettingsPage({ theme, onToggleTheme, isDark }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Settings</h2>
        <p className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-600"}`}>Manage your preferences</p>
      </div>
      <div className={`rounded-2xl p-6 space-y-4 ${isDark ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-300 shadow-md shadow-slate-200/50"}`}>
        <h3 className={`text-sm font-semibold ${isDark ? "text-zinc-300" : "text-slate-800"}`}>Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${isDark ? "text-zinc-200" : "text-slate-900"}`}>Dark Mode</p>
            <p className={`text-xs ${isDark ? "text-zinc-500" : "text-slate-500"}`}>Toggle between light and dark theme</p>
          </div>
          <button onClick={onToggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${isDark ? "bg-indigo-600" : "bg-slate-300"}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow ${isDark ? "left-7" : "left-1"}`} />
          </button>
        </div>
      </div>
      <div className={`rounded-2xl p-6 ${isDark ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-300 shadow-md shadow-slate-200/50"}`}>
        <h3 className={`text-sm font-semibold mb-3 ${isDark ? "text-zinc-300" : "text-slate-800"}`}>About</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">F</div>
          <div>
            <p className={`text-sm font-semibold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>FlowTask</p>
            <p className={`text-xs ${isDark ? "text-zinc-500" : "text-slate-500"}`}>Stay in your flow. Finish what matters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [toast, setToast] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("flowtask_theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("flowtask_theme", next);
  }

  const {
    tasks, categories, visibleTasks,
    statusFilter, priorityFilter, sortOption, searchQuery,
    setSearchQuery, addTask, toggleComplete, deleteTask,
    addCategory, deleteCategory, handleFilterChange,
  } = useTasks();

  function handleAddTask(task) {
    addTask(task);
    setToast("Task created successfully! ✓");
    setShowAddForm(false);
  }

  const isDark = theme === "dark";

  const pageBg = isDark
    ? "bg-[#131127]"
    : "bg-slate-50";

  const headerBg = isDark
    ? "bg-[#131127]/80 border-white/[0.05]"
    : "bg-white/80 border-slate-300";

  // ── Renders ──────────────────────────────────────────────────────────────
  function renderContent() {
    if (activePage === "focus") return <FocusPage isDark={isDark} />;
    if (activePage === "analytics") return <AnalyticsPage tasks={tasks} isDark={isDark} />;
    if (activePage === "settings") return <SettingsPage theme={theme} onToggleTheme={toggleTheme} isDark={isDark} />;
    if (activePage === "categories") {
      return (
        <div className="space-y-6">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Categories</h2>
            <p className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-600"}`}>Organise your tasks into categories</p>
          </div>
          <CategoryManager categories={categories} onAddCategory={addCategory} onDeleteCategory={deleteCategory} theme={theme} />
        </div>
      );
    }

    // Dashboard + Tasks share the same view
    return (
      <div className="space-y-6">
        {/* Stats */}
        <DashboardStats tasks={tasks} theme={theme} />

        {/* Add Task button / form */}
        <div>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <PlusIcon />
              Add Task
            </button>
          ) : (
            <div className="animate-[fadeIn_0.2s_ease-out]">
              <TaskForm onAddTask={handleAddTask} categories={categories} theme={theme} onCancel={() => setShowAddForm(false)} />
            </div>
          )}
        </div>

        {/* Filter + Task list */}
        <div className="space-y-4">
          <FilterBar
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            sortOption={sortOption}
            onFilterChange={handleFilterChange}
            theme={theme}
          />
          <TaskList tasks={visibleTasks} totalCount={tasks.length} onToggleComplete={toggleComplete} onDeleteTask={deleteTask} theme={theme} />
        </div>

        {/* Lower 2-col row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryManager categories={categories} onAddCategory={addCategory} onDeleteCategory={deleteCategory} theme={theme} />
          <UpcomingDeadlinesPanel tasks={tasks} isDark={isDark} />
        </div>
      </div>
    );
  }

  const pageTitles = {
    dashboard: "Dashboard",
    tasks: "My Tasks",
    categories: "Categories",
    focus: "Focus Mode",
    analytics: "Analytics",
    settings: "Settings",
  };

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
        onToggleTheme={toggleTheme}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content area */}
      <div className="lg:pl-[260px] min-h-screen flex flex-col">
        {/* Sticky top bar */}
        <header className={`sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b backdrop-blur-md ${headerBg}`}>
          {/* Hamburger */}
          <button
            className={`lg:hidden p-2 rounded-xl cursor-pointer ${isDark ? "text-zinc-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100"}`}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </button>

          {/* Page title */}
          <div className="flex-1">
            <h1 className={`text-base font-semibold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
              {pageTitles[activePage]}
            </h1>
            <p className={`text-xs hidden sm:block ${isDark ? "text-zinc-600" : "text-slate-500"}`}>{formatDate()}</p>
          </div>

          {/* Search */}
          <div className="hidden sm:block w-[220px]">
            <SearchBar query={searchQuery} onChange={setSearchQuery} theme={theme} />
          </div>

          {/* Bell */}
          <button className={`p-2 rounded-xl cursor-pointer ${isDark ? "text-zinc-400 hover:bg-white/5 hover:text-zinc-200" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`}>
            <BellIcon />
          </button>
        </header>

        {/* Greeting (shown on dashboard/tasks only) */}
        {(activePage === "dashboard" || activePage === "tasks") && (
          <div className="px-6 pt-6 pb-2">
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              {getGreeting()} 👋
            </h2>
            <p className={`text-sm mt-0.5 ${isDark ? "text-zinc-500" : "text-slate-600"}`}>
              You have{" "}
              <span className="font-semibold text-indigo-400">{tasks.filter(t => !t.completed).length} pending tasks</span>
              {" "}today.
            </p>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="w-full bg-[#0b0a1a] text-white py-8 mt-auto border-t border-white/[0.05] flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-medium tracking-wide">© 2026 WAIL KTITU</p>
          <p className="text-xs text-slate-400">Designed and developed by Wail</p>
        </footer>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/20 z-50 text-sm font-medium animate-[fadeIn_0.3s_ease-out]">
          {toast}
        </div>
      )}
    </div>
  );
}
