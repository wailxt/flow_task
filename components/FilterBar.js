"use client";

function FilterIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    );
}

function SortIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="13" y2="6" />
            <line x1="4" y1="12" x2="10" y2="12" />
            <line x1="4" y1="18" x2="7" y2="18" />
            <polyline points="15 15 18 18 21 15" />
            <line x1="18" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export default function FilterBar({
    statusFilter,
    priorityFilter,
    sortOption,
    onFilterChange,
}) {
    const selectClass =
        "appearance-none bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-white/20 transition-colors cursor-pointer";

    const hasActiveFilters = statusFilter !== "All" || priorityFilter !== "All";

    function clearAllFilters() {
        onFilterChange("statusFilter", "All");
        onFilterChange("priorityFilter", "All");
    }

    const activeTags = [];
    if (statusFilter !== "All") {
        activeTags.push({ label: `Status: ${statusFilter}`, key: "statusFilter" });
    }
    if (priorityFilter !== "All") {
        activeTags.push({ label: `Priority: ${priorityFilter}`, key: "priorityFilter" });
    }

    return (
        <div className="space-y-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-5 space-y-5">
                {/* Filters Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-zinc-400">
                            <FilterIcon />
                            <span className="text-xs font-medium uppercase tracking-wide">Filters</span>
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => onFilterChange("statusFilter", e.target.value)}
                                className={selectClass}
                            >
                                <option value="All">All Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </select>
                            <ChevronIcon />
                        </div>

                        <div className="relative">
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
                            <ChevronIcon />
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="border-t border-white/10" />

                {/* Sort Section */}
                <div>
                    <div className="flex items-center gap-2 text-zinc-400 mb-3">
                        <SortIcon />
                        <span className="text-xs font-medium uppercase tracking-wide">Sort</span>
                    </div>
                    <div className="relative inline-block">
                        <select
                            value={sortOption}
                            onChange={(e) => onFilterChange("sortOption", e.target.value)}
                            className={selectClass}
                        >
                            <option value="createdAt">Newest First</option>
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                        </select>
                        <ChevronIcon />
                    </div>
                </div>
            </div>

            {/* Active Filter Tags */}
            {activeTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    {activeTags.map((tag) => (
                        <button
                            key={tag.key}
                            onClick={() => onFilterChange(tag.key, "All")}
                            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-sm text-zinc-300 rounded-full px-3 py-1 transition-colors cursor-pointer"
                        >
                            <span>{tag.label}</span>
                            <CloseIcon />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
