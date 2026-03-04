"use client";

const priorityColors = {
    Low: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    High: "bg-red-500/20 text-red-400",
};

export default function TaskCard({ task, onToggleComplete, onDeleteTask }) {
    return (
        <div
            className={`bg-zinc-900 border border-zinc-800 rounded-xl p-5 transition-all hover:border-zinc-700 ${task.completed ? "opacity-60" : ""
                }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3
                        className={`font-semibold text-zinc-100 ${task.completed ? "line-through text-zinc-500" : ""
                            }`}
                    >
                        {task.title}
                    </h3>

                    {task.description && (
                        <p className="text-sm text-zinc-400 mt-1">{task.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        {/* Priority badge */}
                        <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityColors[task.priority]
                                }`}
                        >
                            {task.priority}
                        </span>

                        {/* Category */}
                        {task.category && (
                            <span className="text-xs text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded-full">
                                {task.category}
                            </span>
                        )}

                        {/* Due date */}
                        {task.dueDate && (
                            <span className="text-xs text-zinc-500">{task.dueDate}</span>
                        )}

                        {/* Status */}
                        <span
                            className={`text-xs font-medium ${task.completed ? "text-emerald-400" : "text-zinc-500"
                                }`}
                        >
                            {task.completed ? "Completed" : "Pending"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${task.completed
                                ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                : "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30"
                            }`}
                    >
                        {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
