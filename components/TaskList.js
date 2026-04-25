"use client";

import TaskCard from "@/components/TaskCard";

function EmptyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  );
}

export default function TaskList({ tasks, totalCount, onToggleComplete, onDeleteTask, theme }) {
  const isDark = theme === "dark";
  const isEmpty = tasks.length === 0;
  const isFiltered = tasks.length < totalCount;

  return (
    <div className="space-y-2.5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
          {isFiltered ? `Showing ${tasks.length} of ${totalCount}` : `${totalCount} task${totalCount !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Task cards */}
      {isEmpty ? (
        <div className={`flex flex-col items-center justify-center gap-3 py-14 rounded-2xl ${isDark ? "bg-white/[0.02] border border-white/[0.05]" : "bg-slate-50 border border-slate-200"}`}>
          <span className={`${isDark ? "text-zinc-700" : "text-gray-300"}`}>
            <EmptyIcon />
          </span>
          <div className="text-center">
            <p className={`text-sm font-medium ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
              {isFiltered ? "No tasks match your filters" : "No tasks yet"}
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? "text-zinc-700" : "text-gray-300"}`}>
              {isFiltered ? "Try clearing filters" : "Add a task to get started"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
}
