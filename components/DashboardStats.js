"use client";

import { calculateProgress } from "@/lib/helpers";

function TasksIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
    );
}

function CompletedIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

export default function DashboardStats({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const highPriority = tasks.filter((t) => t.priority === "High").length;
    const progress = calculateProgress(tasks);

    const stats = [
        { label: "Total Tasks", value: total, color: "text-blue-400", icon: <TasksIcon /> },
        { label: "Completed", value: completed, color: "text-emerald-400", icon: <CompletedIcon /> },
        { label: "High Priority", value: highPriority, color: "text-red-400", icon: <AlertIcon /> },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-zinc-400">{stat.label}</p>
                            <span className={stat.color}>{stat.icon}</span>
                        </div>
                        <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-zinc-400">Overall Progress</p>
                    <p className="text-sm font-medium text-zinc-300">{progress}%</p>
                </div>
                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
