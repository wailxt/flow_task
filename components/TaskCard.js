"use client";

const priorityColors = {
    Low: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    High: "bg-red-500/20 text-red-400",
};

function ClockIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
    );
}

function UndoIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
        </svg>
    );
}

// Map Tailwind bg class to border-l class
function getCategoryBorderClass(bgColor) {
    if (!bgColor) return "border-l-zinc-700";
    return bgColor.replace("bg-", "border-l-");
}

export default function TaskCard({ task, onToggleComplete, onDeleteTask }) {
    const borderClass = task.category
        ? getCategoryBorderClass(task.category.color)
        : "border-l-zinc-700";

    return (
        <div
            className={`bg-white/5 backdrop-blur-md border border-white/10 shadow-lg border-l-4 ${borderClass} rounded-xl p-4 transition-all duration-200 hover:bg-white/[0.08] ${task.completed ? "opacity-60" : ""
                }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3
                        className={`text-lg font-semibold text-zinc-100 ${task.completed ? "line-through text-zinc-500" : ""
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
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityColors[task.priority]}`}
                        >
                            {task.priority}
                        </span>

                        {/* Category badge */}
                        {task.category && (
                            <span
                                className={`${task.category.color} text-white text-xs font-medium px-2.5 py-1 rounded-full`}
                            >
                                {task.category.name}
                            </span>
                        )}

                        {/* Due date */}
                        {task.dueDate && (
                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                <ClockIcon />
                                {task.dueDate}
                            </span>
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
                        title={task.completed ? "Undo" : "Complete"}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${task.completed
                                ? "text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                                : "text-emerald-400 hover:bg-emerald-600/20"
                            }`}
                    >
                        {task.completed ? <UndoIcon /> : <CheckIcon />}
                    </button>
                    <button
                        onClick={() => onDeleteTask(task.id)}
                        title="Delete"
                        className="p-2 rounded-lg text-red-400 hover:bg-red-600/20 transition-colors cursor-pointer"
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
