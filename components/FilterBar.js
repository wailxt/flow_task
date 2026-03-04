"use client";

export default function FilterBar({
    statusFilter,
    priorityFilter,
    sortOption,
    onFilterChange,
}) {
    const selectClass =
        "bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors";

    return (
        <div className="flex flex-wrap gap-3">
            <select
                value={statusFilter}
                onChange={(e) => onFilterChange("statusFilter", e.target.value)}
                className={selectClass}
            >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
            </select>

            <select
                value={priorityFilter}
                onChange={(e) => onFilterChange("priorityFilter", e.target.value)}
                className={selectClass}
            >
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <select
                value={sortOption}
                onChange={(e) => onFilterChange("sortOption", e.target.value)}
                className={selectClass}
            >
                <option value="createdAt">Newest First</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
}
