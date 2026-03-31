"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    theme,
}) {
    const isDark = theme === "dark";

    const selectClass = `appearance-none rounded-lg pl-4 pr-10 py-2.5 text-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark
        ? "bg-white/5 border border-white/10 text-white"
        : "bg-white border border-gray-300 text-gray-800"
        }`;

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
            <div className={`backdrop-blur-md rounded-xl p-5 ${isDark
                ? "bg-white/5 border border-white/10 shadow-lg"
                : "bg-white border border-gray-200 shadow-md"
                }`}>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                    {/* Filters Section */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`flex items-center gap-2 ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                                <FilterIcon />
                                <span className="text-xs font-medium uppercase tracking-wide">Filters</span>
                            </div>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className={`text-xs transition-colors cursor-pointer ${isDark ? "text-zinc-500 hover:text-zinc-300" : "text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={`${selectClass} relative w-[140px] text-left pr-10 block`}>
                                        <span className="block truncate">{statusFilter === "All" ? "All Status" : statusFilter}</span>
                                        <ChevronIcon />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[140px]">
                                    <DropdownMenuRadioGroup value={statusFilter} onValueChange={(val) => onFilterChange("statusFilter", val)}>
                                        <DropdownMenuRadioItem value="All">All Status</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={`${selectClass} relative w-[140px] text-left pr-10 block`}>
                                        <span className="block truncate">{priorityFilter === "All" ? "All Priority" : priorityFilter}</span>
                                        <ChevronIcon />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[140px]">
                                    <DropdownMenuRadioGroup value={priorityFilter} onValueChange={(val) => onFilterChange("priorityFilter", val)}>
                                        <DropdownMenuRadioItem value="All">All Priority</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Separator - Horizontal on mobile, Vertical on larger screens */}
                    <div className={`border-t sm:border-t-0 sm:border-l ${isDark ? "border-white/10" : "border-gray-200"}`} />

                    {/* Sort Section */}
                    <div className="sm:w-48 shrink-0">
                        <div className={`flex items-center gap-2 mb-3 ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                            <SortIcon />
                            <span className="text-xs font-medium uppercase tracking-wide">Sort</span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className={`${selectClass} w-full text-left relative block pr-10`}>
                                    <span className="block truncate">
                                        {sortOption === "createdAt" && "Newest First"}
                                        {sortOption === "dueDate" && "Due Date"}
                                        {sortOption === "priority" && "Priority"}
                                    </span>
                                    <ChevronIcon />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[190px]">
                                <DropdownMenuRadioGroup value={sortOption} onValueChange={(val) => onFilterChange("sortOption", val)}>
                                    <DropdownMenuRadioItem value="createdAt">Newest First</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="dueDate">Due Date</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                            className={`flex items-center gap-1.5 text-sm rounded-full px-3 py-1 transition-colors cursor-pointer ${isDark
                                ? "bg-white/10 hover:bg-white/15 text-zinc-300"
                                : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                                }`}
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
