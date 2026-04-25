"use client";

import { calculateProgress } from "@/lib/helpers";

const STAT_CONFIGS = [
  {
    label: "Total Tasks",
    key: "total",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    label: "Completed",
    key: "completed",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    label: "High Priority",
    key: "highPriority",
    color: "text-red-400",
    bg: "bg-red-500/10",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

export default function DashboardStats({ tasks, theme }) {
  const isDark = theme === "dark";
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const highPriority = tasks.filter((t) => t.priority === "High" && !t.completed).length;
  const progress = calculateProgress(tasks);

  const values = { total, completed, highPriority };

  const card = isDark
    ? "bg-white/[0.03] border border-white/[0.07]"
    : "bg-white border border-slate-300 shadow-md shadow-slate-200/50";

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STAT_CONFIGS.map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 flex items-center gap-4 ${card}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
              <span className={s.color}>{s.icon}</span>
            </div>
            <div>
              <p className={`text-xs font-medium ${isDark ? "text-zinc-500" : "text-slate-500"}`}>{s.label}</p>
              <p className={`text-2xl font-bold mt-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>
                {values[s.key]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className={`rounded-2xl p-5 ${card}`}>
        <div className="flex justify-between items-center mb-2.5">
          <p className={`text-sm font-medium ${isDark ? "text-zinc-400" : "text-slate-600"}`}>Overall Progress</p>
          <p className={`text-sm font-bold ${isDark ? "text-zinc-200" : "text-slate-800"}`}>{progress}%</p>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-white/[0.06]" : "bg-slate-100"}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={`text-xs mt-2 ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
          {completed} of {total} tasks done
        </p>
      </div>
    </div>
  );
}
