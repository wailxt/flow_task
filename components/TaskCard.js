"use client";

const priorityConfig = {
  Low: { pill: "bg-emerald-500/10 text-emerald-400", dot: "bg-emerald-400" },
  Medium: { pill: "bg-amber-500/10 text-amber-400", dot: "bg-amber-400" },
  High: { pill: "bg-red-500/10 text-red-400", dot: "bg-red-400" },
};

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function UndoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

function getDueDateStatus(dueDate) {
  if (!dueDate) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + "T00:00:00");
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  if (due < today) return "overdue";
  if (due.getTime() === tomorrow.getTime()) return "soon";
  return null;
}

function getCategoryBorderColor(bgColor) {
  if (!bgColor) return "border-l-zinc-700";
  return bgColor.replace("bg-", "border-l-");
}

export default function TaskCard({ task, onToggleComplete, onDeleteTask, theme }) {
  const isDark = theme === "dark";
  const p = priorityConfig[task.priority] || priorityConfig.Medium;
  const dueDateStatus = getDueDateStatus(task.dueDate);
  const borderColor = task.category
    ? getCategoryBorderColor(task.category.color)
    : isDark ? "border-l-white/10" : "border-l-slate-300";

  return (
    <div
      className={`
        group relative border-l-[4px] ${borderColor} rounded-2xl px-5 py-4
        transition-all duration-200
        ${isDark
          ? "bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06]"
          : "bg-white border-y border-r border-slate-300 shadow-md shadow-slate-200 hover:shadow-lg hover:shadow-slate-300/50 hover:border-slate-400"
        }
        ${task.completed ? "opacity-55" : ""}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          title={task.completed ? "Undo" : "Mark complete"}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer
            ${task.completed
              ? "bg-emerald-500 border-emerald-500 text-white"
              : isDark
                ? "border-white/20 hover:border-emerald-400 hover:bg-emerald-500/10"
                : "border-slate-500 hover:border-emerald-500 hover:bg-emerald-50"
            }`}
        >
          {task.completed && <CheckIcon />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold leading-snug ${
            task.completed
              ? "line-through " + (isDark ? "text-zinc-600" : "text-slate-500")
              : isDark ? "text-zinc-100" : "text-slate-900"
          }`}>
            {task.title}
          </p>

          {task.description && (
            <p className={`text-xs mt-1 line-clamp-2 ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
              {task.description}
            </p>
          )}

          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {/* Priority */}
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${p.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
              {task.priority}
            </span>

            {/* Category */}
            {task.category && (
              <span className={`${task.category.color} text-white text-[11px] font-medium px-2 py-0.5 rounded-full`}>
                {task.category.name}
              </span>
            )}

            {/* Due date */}
            {task.dueDate && (
              <span className={`inline-flex items-center gap-1 text-[11px] ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
                <ClockIcon />{task.dueDate}
              </span>
            )}

            {/* Status badges */}
            {dueDateStatus === "overdue" && !task.completed && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                Overdue
              </span>
            )}
            {dueDateStatus === "soon" && !task.completed && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
                Due Soon
              </span>
            )}
          </div>
        </div>

        {/* Action buttons — visible on hover */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {task.completed && (
            <button
              onClick={() => onToggleComplete(task.id)}
              title="Undo"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${isDark ? "text-zinc-500 hover:text-zinc-200 hover:bg-white/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
            >
              <UndoIcon />
            </button>
          )}
          <button
            onClick={() => onDeleteTask(task.id)}
            title="Delete"
            className="p-1.5 rounded-lg cursor-pointer text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
