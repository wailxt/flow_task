/**
 * Filter tasks by status and priority.
 */
export function filterTasks(tasks, statusFilter, priorityFilter) {
    return tasks.filter((task) => {
        // Status filter
        if (statusFilter === "Completed" && !task.completed) return false;
        if (statusFilter === "Pending" && task.completed) return false;

        // Priority filter
        if (priorityFilter !== "All" && task.priority !== priorityFilter)
            return false;

        return true;
    });
}

/**
 * Sort tasks by the chosen option.
 */
export function sortTasks(tasks, sortOption) {
    const sorted = [...tasks];

    switch (sortOption) {
        case "dueDate":
            return sorted.sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });

        case "priority": {
            const order = { High: 0, Medium: 1, Low: 2 };
            return sorted.sort(
                (a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3)
            );
        }

        case "createdAt":
            return sorted.sort((a, b) => b.createdAt - a.createdAt);

        default:
            return sorted;
    }
}

/**
 * Calculate completion progress as a percentage.
 */
export function calculateProgress(tasks) {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
}
