"use client";

import TaskCard from "./TaskCard";

function ClipboardIcon() {
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
            <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
    );
}

export default function TaskList({ tasks, totalCount, onToggleComplete, onDeleteTask, theme }) {
    const isDark = theme === "dark";

    if (tasks.length === 0) {
        return (
            <div>
                {totalCount > 0 && (
                    <p className={`text-sm mb-4 ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                        Showing 0 of {totalCount} tasks
                    </p>
                )}
                <div className="relative flex flex-col items-center justify-center py-20 animate-[fadeIn_0.4s_ease-out]">
                    <div className="absolute w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                    <div className="relative">
                        <ClipboardIcon />
                    </div>
                    <h3 className={`text-lg font-semibold mt-4 ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                        No tasks yet
                    </h3>
                    <p className={`text-sm mt-1 text-center max-w-xs ${isDark ? "text-zinc-500" : "text-gray-400"}`}>
                        Start by adding your first task and organize your flow.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <p className={`text-sm mb-4 ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                Showing {tasks.length} of {totalCount} tasks
            </p>
            <div className="space-y-3">
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
        </div>
    );
}
