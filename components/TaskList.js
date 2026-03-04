"use client";

import TaskCard from "./TaskCard";

function ClipboardIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
            <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
    );
}

export default function TaskList({ tasks, totalCount, onToggleComplete, onDeleteTask }) {
    if (tasks.length === 0) {
        return (
            <div>
                {totalCount > 0 && (
                    <p className="text-sm text-zinc-400 mb-4">
                        Showing 0 of {totalCount} tasks
                    </p>
                )}
                <div className="flex flex-col items-center justify-center py-20 animate-[fadeIn_0.4s_ease-out]">
                    <ClipboardIcon />
                    <h3 className="text-lg font-semibold text-zinc-400 mt-4">No tasks yet</h3>
                    <p className="text-sm text-zinc-500 mt-1 text-center max-w-xs">
                        Start by adding your first task and organize your flow.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <p className="text-sm text-zinc-400 mb-4">
                Showing {tasks.length} of {totalCount} tasks
            </p>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggleComplete={onToggleComplete}
                        onDeleteTask={onDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
}
