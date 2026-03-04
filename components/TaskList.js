"use client";

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-zinc-500 text-sm">
                    No tasks yet. Add one to get started.
                </p>
            </div>
        );
    }

    return (
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
    );
}
