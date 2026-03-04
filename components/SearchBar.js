"use client";

function SearchIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

export default function SearchBar({ query, onChange, theme }) {
    const isDark = theme === "dark";

    return (
        <div className="relative">
            <SearchIcon />
            <input
                type="text"
                placeholder="Search tasks..."
                value={query}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark
                    ? "bg-white/5 border border-white/10 text-zinc-100 placeholder-zinc-500"
                    : "bg-white border border-gray-300 text-gray-800 placeholder-gray-400 shadow-sm"
                    }`}
            />
        </div>
    );
}
