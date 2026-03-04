"use client";

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, totalCount, onToggleComplete, onDeleteTask }) {
    if (tasks.length === 0) {
        return (
            <div>
                {totalCount > 0 && (
                    <p className="text-sm text-zinc-400 mb-4">
                        Showing 0 of {totalCount} tasks
                    </p>
                )}
                <div className="text-center py-16">
                    <p className="text-zinc-500 text-sm">
                        No tasks yet. Add one to get started.
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
